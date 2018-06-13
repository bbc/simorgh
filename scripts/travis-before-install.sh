#!/usr/bin/env bash

npm run build
npm run start &
npx wait-on http://localhost:7080
npx cypress run
