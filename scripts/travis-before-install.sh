npm run build
npm run start &
$(npm bin)/wait-on http://localhost:7080
$(npm bin)/cypress run
