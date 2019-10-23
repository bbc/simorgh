#!/bin/bash
set -e

npx -p lighthouse@5 lighthouse http://localhost:7080/news/articles/cn7k01xp8kxo --chrome-flags="--no-sandbox --headless --disable-gpu" --output json --output html --output-path simorgh --config-path scripts/lighthouseConfig.js && node scripts/lighthouseBudget.js run
npx -p lighthouse@5 lighthouse http://localhost:7080/igbo --chrome-flags="--no-sandbox --headless --disable-gpu" --output json --output html --output-path simorgh --config-path scripts/lighthouseConfig.js && node scripts/lighthouseBudget.js run

