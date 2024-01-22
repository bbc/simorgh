#!/bin/bash
set -e
npx -p lighthouse@11.3.0 lighthouse http://localhost:7080/news/articles/cn7k01xp8kxo --chrome-flags="--no-sandbox --headless --disable-gpu" --output json --output html --output-path simorgh --config-path scripts/lighthouseConfig.js && node scripts/lighthouseBudget.js run
npx -p lighthouse@11.3.0 lighthouse http://localhost:7080/kyrgyz --chrome-flags="--no-sandbox --headless --disable-gpu" --output json --output html --output-path simorgh --config-path scripts/lighthouseConfig.js && node scripts/lighthouseBudget.js run
npx -p lighthouse@11.3.0 lighthouse http://localhost:7081/pidgin/live/c7p765ynk9qt --chrome-flags="--no-sandbox --headless --disable-gpu" --output json --output html --output-path simorgh --config-path scripts/lighthouseConfig.js && node scripts/lighthouseBudget.js run
npx -p lighthouse@11.3.0 lighthouse http://localhost:7081/pidgin/live/c07zr0zwjnnt --chrome-flags="--no-sandbox --headless --disable-gpu" --output json --output html --output-path simorgh --config-path scripts/lighthouseConfig.js && node scripts/lighthouseBudget.js run
