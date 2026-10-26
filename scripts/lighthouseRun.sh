#!/bin/bash
set -euo pipefail

mkdir -p lighthouse-reports

run_audit() {
  local name="$1"
  local url="$2"
  local output_path="lighthouse-reports/${name}"

  lighthouse "$url" \
    --chrome-flags="--no-sandbox --headless --disable-gpu" \
    --output json \
    --output html \
    --output-path "$output_path" \
    --config-path scripts/lighthouseConfig.js
  node scripts/lighthouseBudget.js run "${output_path}.report.json"
}

pids=()
run_audit pidgin-article http://localhost:7081/pidgin/articles/ce9wk6glg4lo &
pids+=("$!")
run_audit hindi-home http://localhost:7080/hindi &
pids+=("$!")
run_audit pidgin-live http://localhost:7081/pidgin/live/c7p765ynk9qt &
pids+=("$!")
run_audit somali-send http://localhost:7081/somali/send/u130092370 &
pids+=("$!")

status=0
for pid in "${pids[@]}"; do
  if ! wait "$pid"; then
    status=1
  fi
done

exit "$status"