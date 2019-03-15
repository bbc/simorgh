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


It would be good to explain under input functions section below why this library is not providing the showPrivacyBanner showCookieBanner functions.
Also, whether these functions should be carrying out the display: none; visibility: hidden; aspect of hiding/showing the front-end components.
Currently, the expected behaviour of these input functions is not clear.

**Why are the inputs functions?**  

Functions were chosen due to how they integrate with React and other state based frameworks. Exporting a boolean value would add additional complexity to the application and allowing the user to pass their own function is designed to give more freedom than booleans would. 

**Why doesn't this function hide/show the banners for me?**  

This banner logic is designed to be compatible with any page or JavaScript application. Because of this it cant make any assumptions about what rendering logic it needs to control to hide/show elements. 

## Output Functions

- **runInitial()**  
*Purpose:* Run once on page  
*Function:* Does initial checks to see what banners the user should be shown, and sets privacy and policy cookie.

- **privacyOnAllow()**  
*Purpose:* onClick action for Privacy Banner `OK` button  
*Function:* Hides the privacy banner

- **privacyOnReject()**  
*Purpose:* onClick action for Privacy Banner `Find out what's changed` link  
*Function:* Hides the privacy banner

- **cookieOnAllow()**  
*Purpose:* onClick action for Cookie Banner `Yes, I agree` button  
*Function:* Hides the cookie banner, sets policy and explicit cookie

- **cookieOnReject()**  
*Purpose:* onClick action for Cookie Banner `No, take me to settings` link  
*Function:* Hides the cookie banner and sets explicit cookie
