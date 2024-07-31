/*
  AMP Boilerplate Code https://github.com/ampproject/amphtml/blob/master/spec/amp-boilerplate.md
*/
import React from 'react';

export const AMP_SCRIPT = `body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`;
export const AMP_NO_SCRIPT = `body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`;

export const AMP_JS = <script async src="https://cdn.ampproject.org/v0.js" />;

export const AMP_ACCESS_JS = (
  <script
    async
    custom-element="amp-access"
    src="https://cdn.ampproject.org/v0/amp-access-0.1.js"
  />
);
export const AMP_ANALYTICS_JS = (
  <script
    async
    custom-element="amp-analytics"
    src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
  />
);
export const AMP_BIND_JS = (
  <script
    async
    custom-element="amp-bind"
    src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
  />
);
export const AMP_CONSENT_JS = (
  <script
    async
    custom-element="amp-consent"
    src="https://cdn.ampproject.org/v0/amp-consent-0.1.js"
  />
);
export const AMP_GEO_JS = (
  <script
    async
    custom-element="amp-geo"
    src="https://cdn.ampproject.org/v0/amp-geo-0.1.js"
  />
);
export const AMP_LIST_JS = (
  <script
    async
    custom-element="amp-list"
    src="https://cdn.ampproject.org/v0/amp-list-0.1.js"
  />
);
export const AMP_MUSTACHE_JS = (
  <script
    async
    custom-template="amp-mustache"
    src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"
  />
);
export const AMP_ADS_JS = (
  <script
    async
    custom-element="amp-ad"
    src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
  />
);
export const AMP_AD = (
  <script
    async
    custom-element="amp-ad"
    src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
  />
);

export const AMP_SCRIPT_JS = (
  <script
    async
    custom-element="amp-script"
    src="https://cdn.ampproject.org/v0/amp-script-0.1.js"
  />
);

export const AMP_EXPERIMENTATION_JS = (
  <script
    async
    custom-element="amp-experiment"
    src="https://cdn.ampproject.org/v0/amp-experiment-0.1.js"
  />
);
