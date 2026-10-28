#!/usr/bin/env bash
# Pluri rebrand (1.4): fail if "Conjugately" shows up anywhere a customer could see it.
# Allowed on purpose (permanent IDs, see claude/pluri-rebrand-plan.md 2b):
#   conjugately_* storage keys, com.conjugately.app.* IDs, conjugately.onrender.com,
#   preview.conjugately.com, conjugately.com legal URLs (until plurifrench.com is live),
#   the Expo slug/scheme, and code comments.
cd "$(dirname "$0")/.." || exit 1
hits=$(grep -rn -i "conjugately" app components lib constants hooks app.json \
  --include=*.ts --include=*.tsx --include=*.json \
  | grep -v -E 'conjugately_|com\.conjugately\.app|conjugately\.onrender\.com|preview\.conjugately\.com|https://conjugately\.com/(terms|privacy)|"slug": "conjugately"|"scheme": "conjugately"' \
  | grep -v -E ':[0-9]+:\s*(//|\*|/\*|\{/\*)')
if [ -n "$hits" ]; then
  echo "Brand check FAILED. Customer-visible 'Conjugately' found:"
  echo "$hits"
  exit 1
fi
echo "Brand check passed: no customer-visible 'Conjugately'."
