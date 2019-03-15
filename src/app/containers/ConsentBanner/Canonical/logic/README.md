# Canonical Cookie Banner Logic

```js
import cookies from '.';

const {
    runInitial,
    privacyOnAllow,
    privacyOnReject,
    cookieOnAllow,
    cookieOnReject,
  } = cookies({ setShowPrivacyBanner, setShowCookieBanner });
```

## Input Functions

- **setShowPrivacyBanner(boolean)**  
A function, which when called with a boolean, shows or hides the privacy banner.

- **setShowCookieBanner(boolean)**  
A function, which when called with a boolean, shows or hides the cookie banner.

NB: It is down to the application to implement the rendering logic. On a fresh visit both `setShowPrivacyBanner` and `setShowCookieBanner` functions will be called with `true`. The privacy banner should be shown first, followed then by the cookie banner.

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
