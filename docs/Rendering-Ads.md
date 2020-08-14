# Rendering Ad

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

1. Download [ModHeader Chrome extension](https://www.google.com/search?q=modheader+chrome+pass+boolean&rlz=1C5CHFA_enGB762GB762&oq=modheader&aqs=chrome.0.69i59l2j69i57j69i60j69i61j69i60j69i65l2.1039j0j7&sourceid=chrome&ie=UTF-8)
2. With the ModHeader extension, add a header of `BBC-Adverts` with the value `true`.

   i.e: ![image](https://user-images.githubusercontent.com/30599794/90151074-40bd7f80-dd7e-11ea-985d-902ed04641ac.png)

3. Run local environment: `npm run dev`. If you would like to run with Simorgh's CSP Headers, run the following command: `npm run build && npm run start`
4. Visit the home page of one of the services with Ads enabled and append this query string to the url: `?site=test&ads-debug=true`

   i.e http://localhost:7080/mundo?site=test&ads-debug=true

## Rendering Ads on test environment

Given you do not have any ad blocking extensions in your browser.

1. Use a proxy to set your location outside the UK, visiting https://www.test.bbc.com/userinfo should show `"X-Ip_is_advertise_combined": "yes"`

2. If you would like to see the ads with the debugger tool you can append this query string to the url: `?ads-debug=true`

   i.e https://www.test.bbc.com/mundo?ads-debug=true

## Additional Query Strings

You can append this query string `?ads-js-env=live` to your URL to load the LIVE `dotcom-bootstrap` for canonical pages only.

    i.e https://www.test.bbc.com/mundo?ads-js-env=live
