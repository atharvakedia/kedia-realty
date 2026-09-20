#!/usr/bin/env bash
# Stages Vercel WAF rules for kedia-realty. Nothing goes live until you run
#   vercel firewall publish --yes
#
# Prereqs (one-time):
#   npm i -g vercel            # or use: npx vercel@latest ...
#   vercel login               # log in as the account that owns atharva-kedia-s-projects
#   vercel link --scope atharva-kedia-s-projects --project kedia-realty --yes
#
# Rollout order (see https://vercel.com/docs/vercel-firewall/vercel-waf/custom-rules):
#   1. Run this script -> rules are staged with the actions below.
#   2. vercel firewall diff            (review)
#   3. vercel firewall publish --yes   (go live)
#   4. Watch https://vercel.com/atharva-kedia-s-projects/kedia-realty/firewall for ~24h.
#      Rate-limit rules start in "log" mode; flip them to enforce with:
#        vercel firewall rules edit "<name>" --rate-limit-action rate_limit --yes
#        vercel firewall publish --yes

set -euo pipefail

SCOPE="${VERCEL_SCOPE:-atharva-kedia-s-projects}"
V="npx --yes vercel@latest"

echo "==> Managed rulesets (OWASP core rules: deny known attack signatures)"
# The MCP/CLI cannot toggle managed rulesets non-interactively on every plan.
# Enable these in the dashboard: Firewall -> Configure -> Managed Rulesets:
#   - OWASP Core Rule Set: Local File Inclusion, Remote Code Execution,
#     PHP Attack, Scanner Detection, SQL Injection, XSS -> "Deny"
#   - Bot Protection -> "Challenge" (if available on your plan)
#   - AI Bots -> your choice (block if you don't want scrapers training on listings)

echo "==> Rule 1: deny exploit probes (dotfiles, PHP/WordPress tooling, dumps)"
$V firewall rules add "Deny exploit probes" \
  --scope "$SCOPE" \
  --condition '{"type":"path","op":"re","value":"(^|/)\\.(?!well-known/)[^/]+"}' \
  --or \
  --condition '{"type":"path","op":"re","value":"/(wp-admin|wp-login\\.php|wp-content|wp-includes|wp-json|xmlrpc\\.php|phpmyadmin|phpMyAdmin|pma|mysql|adminer|cgi-bin|vendor|node_modules|backup|_ignition|telescope|actuator|solr|jenkins|console)(/|$)"}' \
  --or \
  --condition '{"type":"path","op":"re","value":"\\.(php[0-9]?|phtml|asp|aspx|jsp|jspx|cgi|pl|sh|sql|sqlite|db|bak|old|orig|save|swp|tar|tgz|gz|zip|rar|7z|log|ini|yml|yaml|toml|env|pem|key|crt)$"}' \
  --action deny --yes

echo "==> Rule 2: rate limit contact form submissions (server action POST)"
$V firewall rules add "Rate limit contact form" \
  --scope "$SCOPE" \
  --condition '{"type":"path","op":"eq","value":"/contact"}' \
  --condition '{"type":"method","op":"eq","value":"POST"}' \
  --action rate_limit \
  --rate-limit-window 60 \
  --rate-limit-requests 5 \
  --rate-limit-keys ip \
  --rate-limit-action log \
  --yes

echo "==> Rule 3: rate limit career applications (resume uploads to storage)"
$V firewall rules add "Rate limit career applications" \
  --scope "$SCOPE" \
  --condition '{"type":"path","op":"eq","value":"/careers/introduce-yourself"}' \
  --condition '{"type":"method","op":"eq","value":"POST"}' \
  --action rate_limit \
  --rate-limit-window 300 \
  --rate-limit-requests 5 \
  --rate-limit-keys ip \
  --rate-limit-action log \
  --yes

echo "==> Rule 4: challenge repeated hits on the admin login page"
$V firewall rules add "Rate limit admin login" \
  --scope "$SCOPE" \
  --condition '{"type":"host","op":"eq","value":"admin.kediagrp.com"}' \
  --condition '{"type":"path","op":"eq","value":"/login"}' \
  --action rate_limit \
  --rate-limit-window 60 \
  --rate-limit-requests 20 \
  --rate-limit-keys ip \
  --rate-limit-action challenge \
  --yes

echo "==> Rule 5: challenge every non-verified visitor to the admin host"
$V firewall rules add "Challenge admin host" \
  --scope "$SCOPE" \
  --condition '{"type":"host","op":"eq","value":"admin.kediagrp.com"}' \
  --action challenge --yes

echo
echo "Staged. Review with:   $V firewall diff --scope $SCOPE"
echo "Publish with:          $V firewall publish --scope $SCOPE --yes"
