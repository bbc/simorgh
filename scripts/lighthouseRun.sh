#!/bin/bash

npx -p lighthouse@5 lighthouse http://localhost.bbc.com:7080/news/articles/c6v11qzyv8po --chrome-flags="--no-sandbox --headless --disable-gpu" --output json --output html --output-path simorgh --config-path scripts/lighthouseConfig.js && node scripts/lighthouseBudget.js run
npx -p lighthouse@5 lighthouse http://localhost.bbc.com:7080/igbo --chrome-flags="--no-sandbox --headless --disable-gpu" --output json --output html --output-path simorgh --config-path scripts/lighthouseConfig.js && node scripts/lighthouseBudget.js run

