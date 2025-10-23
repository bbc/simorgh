#!/bin/bash
set -e

mkdir -p lighthouse-reports

  lighthouse http://localhost:7081/news/articles/cn7k01xp8kxo \
  --chrome-flags="--no-sandbox --headless --disable-gpu" --output json --output html \
  --output-path lighthouse-reports/news-article \
  --config-path scripts/lighthouseConfig.js && \
  node scripts/lighthouseBudget.js run lighthouse-reports/news-article.report.json

# lighthouse http://localhost:7080/hindi \
#   --chrome-flags="--no-sandbox --headless --disable-gpu" \
#   --output json --output html \
#   --output-path lighthouse-reports/hindi-home \
#   --config-path scripts/lighthouseConfig.js && \
#   node scripts/lighthouseBudget.js run

# lighthouse http://localhost:7081/pidgin/live/c7p765ynk9qt \
#   --chrome-flags="--no-sandbox --headless --disable-gpu" \
#   --output json --output html \
#   --output-path lighthouse-reports/pidgin-live \
#   --config-path scripts/lighthouseConfig.js && \
#   node scripts/lighthouseBudget.js run

# lighthouse http://localhost:7081/somali/send/u130092370 \
#   --chrome-flags="--no-sandbox --headless --disable-gpu" \
#   --output json --output html \
#   --output-path lighthouse-reports/somali-send \
#   --config-path scripts/lighthouseConfig.js && \
#   node scripts/lighthouseBudget.js run