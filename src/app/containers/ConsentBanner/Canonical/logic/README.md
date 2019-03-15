# Canonical Cookie Banner Logic

```js
import logic from './index';

const {
    runInitial,
    privacyOnAllow,
    privacyOnReject,
    cookieOnAllow,
    cookieOnReject,
  } = logic({ showPrivacyBanner, showCookieBanner });
```

## Input Functions

- **showPrivacyBanner(boolean)**  
A function, which when called with a boolean, shows or hides the privacy banner.

- **showCookieBanner(boolean)**  
A function, which when called with a boolean, shows or hides the cookie banner.

NB: It is down to the application to implement the rendering logic. On a fresh visit both `showPrivacyBanner` and `showCookieBanner` functions will be called with `true`. The privacy banner should be shown first, followed then by the cookie banner.

## Output Functions

- **runInitial()**  
*Purpose:* Run once on page  
*Function:* Does initial checks to see what banners the user should be shown, and sets privacy and policy cookie.

- **privacyOnAllow()**  
*Purpose:* onClick action for Privacy `OK` button  
*Function:* Hides the privacy banner

- **privacyOnReject()**  
*Purpose:* onClick action for Privacy `Find out what's changed` link  
*Function:* Hides the privacy banner

- **cookieOnAllow()**  
*Purpose:* onClick action for Privacy `Yes, I agree` button  
*Function:* Hides the cookie banner, sets policy and explicit cookie

- **cookieOnReject()**  
*Purpose:* onClick action for Privacy `No, take me to settings` button  
*Function:* Hides the cookie banner and sets explicit cookie