#!/bin/bash
set -e
lighthouse http://localhost:7081/pidgin/articles/cwl08rd38l6o --chrome-flags="--no-sandbox --headless --disable-gpu" --output json --output html --output-path simorgh --config-path scripts/lighthouseConfig.js && node scripts/lighthouseBudget.js run
lighthouse http://localhost:7080/hindi --chrome-flags="--no-sandbox --headless --disable-gpu" --output json --output html --output-path simorgh --config-path scripts/lighthouseConfig.js && node scripts/lighthouseBudget.js run
lighthouse http://localhost:7081/pidgin/live/c7p765ynk9qt --chrome-flags="--no-sandbox --headless --disable-gpu" --output json --output html --output-path simorgh --config-path scripts/lighthouseConfig.js && node scripts/lighthouseBudget.js run
lighthouse http://localhost:7081/somali/send/u130092370 --chrome-flags="--no-sandbox --headless --disable-gpu" --output json --output html --output-path simorgh --config-path scripts/lighthouseConfig.js && node scripts/lighthouseBudget.js run
