# Ad

We are currently rendering two types of Ads on our front pages.

Leaderboard Ad
![Leaderboard Ad
](https://user-images.githubusercontent.com/30599794/90142128-eb7c7080-dd73-11ea-8c68-f47b27f56620.png)

MPU Ad
![MPU Ad](https://user-images.githubusercontent.com/30599794/90142048-cee03880-dd73-11ea-92f7-1f1c9098d228.png)

## Services with Ads enabled

Afrique, Arabic, Hindi, Mundo, Portuguese, Russian, Zhongwen

## Rendering Ads on local environment

Given you are using Chrome browser.

1. Download [ModHeader Chrome extention](https://www.google.com/search?q=modheader+chrome+pass+boolean&rlz=1C5CHFA_enGB762GB762&oq=modheader&aqs=chrome.0.69i59l2j69i57j69i60j69i61j69i60j69i65l2.1039j0j7&sourceid=chrome&ie=UTF-8)
2. Run local environment (`cd simorgh && npm run dev`)
3. Visit the home page of one of the services with Ads enabled and append this query string to the url: `?adUnit=/4817/bbccom.test.site.flash/news_homepage_int&ads-debug=true`
   i.e http://localhost:7080/mundo?adUnit=/4817/bbccom.test.site.flash/news_homepage_int&ads-debug=true

## Rendering Ads on test environment

Given you do not have any ad blocking extensions in your browser.

1. Use a proxy to set your location outside the UK, visiting https://www.bbc.com/userinfo should show `"X-Ip_is_advertise_combined": "yes"`
2. Visit the home page of one of the services with Ads enabled and append this query string to the url: `ads-debug=true`
   i.e: https://www.test.bbc.com/mundo?ads-debug=true
