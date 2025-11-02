cp ../envConfig/local.env .env
sed '/^SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN=http:\/\/localhost:7080$/! s/:7080/:7081/g' .env > .env.tmp
mv .env.tmp .env
mkdir -p public
cp -r ../public/. public