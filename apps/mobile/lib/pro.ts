import { useCallback, useEffect, useState } from "react";
import { Linking, Platform } from "react-native";

/**
 * Pro entitlement, via RevenueCat.
 *
 * The paywall is client-side only: progress lives in AsyncStorage and
 * /api/get-quiz is unauthenticated, so this protects revenue, not server cost.
 * That is a known and accepted limitation - see APP_STORE_SUBSCRIPTION_RUNBOOK.md.
 *
 * The native module is required lazily so that Expo Go, the web build and any
 * dev client built before react-native-purchases was added keep working: no
 * module means no entitlement, never a crash.
 */

export const ENTITLEMENT_ID = "pro";
export const PRODUCT_ANNUAL = "com.conjugately.app.pro.annual";
export const PRODUCT_MONTHLY = "com.conjugately.app.pro.monthly";
/**
 * One-time purchase, US$79.99 (1.2.4.1). A non-consumable in App Store Connect,
 * attached in RevenueCat to the same `pro` entitlement and added to the current
 * offering as its Lifetime package. Until that is done it simply doesn't appear.
 */
export const PRODUCT_LIFETIME = "com.conjugately.app.pro.lifetime";

/** Public SDK key. Safe to ship in the binary; set it in eas.json / .env. */
const API_KEY = process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY ?? "";

let Purchases: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  Purchases = require("react-native-purchases").default;
} catch {
  Purchases = null;
}

let configured = false;

export function purchasesAvailable(): boolean {
  return !!Purchases && !!API_KEY && Platform.OS === "ios";
}

/** Call once, as early as possible. Safe to call more than once. */
export function configurePurchases(): void {
  if (configured || !purchasesAvailable()) return;
  try {
    Purchases.configure({ apiKey: API_KEY });
    configured = true;
  } catch {
    configured = false;
  }
}

async function readEntitlement(): Promise<boolean> {
  if (!purchasesAvailable()) return false;
  try {
    const info = await Purchases.getCustomerInfo();
    return !!info?.entitlements?.active?.[ENTITLEMENT_ID];
  } catch {
    return false;
  }
}

export type ProPackage = {
  identifier: string;
  productId: string;
  priceString: string;
  period: "annual" | "monthly" | "lifetime" | "other";
  raw: any;
};

/**
 * True if this customer still has a Monthly or Annual subscription running
 * (a free trial counts). Apple never cancels a subscription when someone buys
 * Lifetime, so the paywall uses this to tell them to cancel it themselves.
 */
export function hasActiveSubscription(customerInfo: any): boolean {
  const subs: unknown = customerInfo?.activeSubscriptions;
  if (!Array.isArray(subs)) return false;
  return subs.some((id) =>
    typeof id === "string" && (id.startsWith(PRODUCT_ANNUAL) || id.startsWith(PRODUCT_MONTHLY)),
  );
}

/** Whether this customer has a Monthly or Annual subscription running now. */
export async function readActiveSubscription(): Promise<boolean> {
  if (!purchasesAvailable()) return false;
  try {
    return hasActiveSubscription(await Purchases.getCustomerInfo());
  } catch {
    return false;
  }
}

export const MANAGE_SUBSCRIPTIONS_URL = "https://apps.apple.com/account/subscriptions";

/**
 * Opens Apple's own subscription screen, where a subscription is cancelled.
 * Apple does not let an app cancel one itself (30 Oct 2026, Cancel Pro).
 */
export async function openManageSubscriptions(): Promise<void> {
  try {
    if (purchasesAvailable()) { await (Purchases as any).showManageSubscriptions(); return; }
  } catch {}
  Linking.openURL(MANAGE_SUBSCRIPTIONS_URL).catch(() => {});
}

function readPeriod(productId: string, packageType?: string): ProPackage["period"] {
  if (productId === PRODUCT_ANNUAL) return "annual";
  if (productId === PRODUCT_MONTHLY) return "monthly";
  // By product id, or RevenueCat's own Lifetime package type if the id differs.
  if (productId === PRODUCT_LIFETIME || packageType === "LIFETIME") return "lifetime";
  return "other";
}

export function usePro() {
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState<ProPackage[]>([]);

  const refresh = useCallback(async () => {
    setIsPro(await readEntitlement());
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      configurePurchases();
      const active = await readEntitlement();
      if (!alive) return;
      setIsPro(active);

      if (purchasesAvailable()) {
        try {
          const offerings = await Purchases.getOfferings();
          const list = offerings?.current?.availablePackages ?? [];
          if (alive) {
            setPackages(
              list.map((p: any) => ({
                identifier: p.identifier,
                productId: p.product?.identifier ?? "",
                // Always the store's own localised price. Never a hard-coded one:
                // Apple rejects a paywall whose price does not match the product.
                priceString: p.product?.priceString ?? "",
                period: readPeriod(p.product?.identifier ?? "", p.packageType),
                raw: p,
              })),
            );
          }
        } catch {
          if (alive) setPackages([]);
        }
      }
      if (alive) setLoading(false);
    })();

    let remove: (() => void) | undefined;
    if (purchasesAvailable()) {
      try {
        const listener = () => { refresh(); };
        Purchases.addCustomerInfoUpdateListener(listener);
        remove = () => { try { Purchases.removeCustomerInfoUpdateListener(listener); } catch {} };
      } catch {}
    }

    return () => { alive = false; remove?.(); };
  }, [refresh]);

  const purchase = useCallback(async (pkg: ProPackage) => {
    if (!purchasesAvailable()) return { ok: false, cancelled: false, error: "unavailable", customerInfo: null };
    try {
      const res = await Purchases.purchasePackage(pkg.raw);
      const customerInfo = res?.customerInfo ?? null;
      const active = !!customerInfo?.entitlements?.active?.[ENTITLEMENT_ID];
      setIsPro(active);
      return { ok: active, cancelled: false, error: active ? null : "not-entitled", customerInfo };
    } catch (e: any) {
      // A cancelled purchase is not an error worth showing.
      if (e?.userCancelled) return { ok: false, cancelled: true, error: null, customerInfo: null };
      return { ok: false, cancelled: false, error: e?.message ?? "purchase-failed", customerInfo: null };
    }
  }, []);

  const restore = useCallback(async () => {
    if (!purchasesAvailable()) return { ok: false, error: "unavailable" };
    try {
      const info = await Purchases.restorePurchases();
      const active = !!info?.entitlements?.active?.[ENTITLEMENT_ID];
      setIsPro(active);
      return { ok: active, error: active ? null : "nothing-to-restore" };
    } catch (e: any) {
      return { ok: false, error: e?.message ?? "restore-failed" };
    }
  }, []);

  return { isPro, loading, packages, purchase, restore, refresh };
}
