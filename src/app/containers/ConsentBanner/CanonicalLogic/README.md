# Consent Banner Utilities

```js
import consentBannerUtilities from '.';

const {
  runInitial,
  privacyOnAllow,
  privacyOnReject,
  cookieOnAllow,
  cookieOnReject,
} = consentBannerUtilities({ setShowPrivacyBanner, setShowCookieBanner });
```

## Input Functions

- **setShowPrivacyBanner(boolean)**  
  Afunction,whichwhencalledwithaboolean,showsorhidestheprivacybanner.

- **setShowCookieBanner(boolean)**  
  Afunction,whichwhencalledwithaboolean,showsorhidesthecookiebanner.

NB: It is down to the application to implement the rendering logic. On a fresh visit both `setShowPrivacyBanner` and `setShowCookieBanner` functions will be called with `true`. The privacy banner should be shown first, followed then by the cookie banner.

**Why are the inputs functions?**

Functions were chosen due to how they integrate with React and other state based frameworks. Exporting a boolean value would add additional complexity to the application and allowing the user to pass their own function is designed to give more freedom than booleans would.

**Why doesn't this function hide/show the banners for me?**

This banner logic is designed to be compatible with any page or JavaScript application. Because of this it cant make any assumptions about what rendering logic it needs to control to hide/show elements.

## Output Functions

- **runInitial()**  
  _Purpose:_ Run once on page  
  _Function:_ Does initial checks to see what banners the user should be shown, and sets privacy and policy cookie. This should be run on page load, before any onClick may be triggered by the user.

- **privacyOnAllow()**  
  _Purpose:_ onClick action for Privacy Banner `OK` button  
  _Function:_ Hides the privacy banner

- **privacyOnReject()**  
  _Purpose:_ onClick action for Privacy Banner `Find out what's changed` link  
  _Function:_ Hides the privacy banner

- **cookieOnAllow()**  
  _Purpose:_ onClick action for Cookie Banner `Yes, I agree` button  
  _Function:_ Hides the cookie banner, sets policy and explicit cookie

- **cookieOnReject()**  
  _Purpose:_ onClick action for Cookie Banner `No, take me to settings` link  
  _Function:_ Hides the cookie banner and sets explicit cookie

## Actions

This set of utility functions sets the cookie values of `ckns_privacy`, `ckns_explicit` and `ckns_policy` as well as making a request to the cookie oven to set `ckns_policy` on the other domain `(bbc.com/bbc.co.uk)` to what the user is currently on.
