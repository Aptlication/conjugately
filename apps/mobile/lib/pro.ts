import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";

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
  period: "annual" | "monthly" | "other";
  raw: any;
};

function readPeriod(productId: string): ProPackage["period"] {
  if (productId === PRODUCT_ANNUAL) return "annual";
  if (productId === PRODUCT_MONTHLY) return "monthly";
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
                period: readPeriod(p.product?.identifier ?? ""),
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
    if (!purchasesAvailable()) return { ok: false, cancelled: false, error: "unavailable" };
    try {
      const res = await Purchases.purchasePackage(pkg.raw);
      const active = !!res?.customerInfo?.entitlements?.active?.[ENTITLEMENT_ID];
      setIsPro(active);
      return { ok: active, cancelled: false, error: active ? null : "not-entitled" };
    } catch (e: any) {
      // A cancelled purchase is not an error worth showing.
      if (e?.userCancelled) return { ok: false, cancelled: true, error: null };
      return { ok: false, cancelled: false, error: e?.message ?? "purchase-failed" };
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
