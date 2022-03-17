# web-vitals - [![Known Vulnerabilities](https://snyk.io/test/github/bbc/psammead/badge.svg?targetFile=packages%2Fcomponents%2Fweb-vitals%2Fpackage.json)](https://snyk.io/test/github/bbc/psammead?targetFile=packages%2Fcomponents%2Fweb-vitals%2Fpackage.json) [![Dependency Status](https://david-dm.org/bbc/psammead.svg?path=packages/components/web-vitals)](https://david-dm.org/bbc/psammead?path=packages/components/web-vitals) [![peerDependencies Status](https://david-dm.org/bbc/psammead/peer-status.svg?path=packages/components/web-vitals)](https://david-dm.org/bbc/psammead?path=packages/components/web-vitals&type=peer) [![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg?sanitize=true)](https://bbc.github.io/psammead/?path=/story/web-vitals--containing-image) [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bbc/psammead/blob/latest/LICENSE) [![npm version](https://img.shields.io/npm/v/@bbc/web-vitals.svg)](https://www.npmjs.com/package/@bbc/web-vitals) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md)

## Description

The `WebVitals` utility provides a configurable hook which will collect device capability metrics and [Web Vitals](https://web.dev/vitals/?gclid=CjwKCAjw-5v7BRAmEiwAJ3DpuGq4yydZBEHoLscEvvrOE5Ef01huTLJebM6jdIWsGKS5L3QeMT5GfhoCNpkQAvD_BwE) metrics for each page view, and then send those metrics to a reporting endpoint when the user leaves the page.

### Metrics we report on

#### Core Web-Vitals

- [CLS](https://web.dev/cls/) (Cumulative Layout Shift)
- [LCP](https://web.dev/lcp/) (Largest Contentful Paint)
- [FID](https://web.dev/fid/) (First Input Delay)

### Other data (useful for categorising the web-vitals data received)

- [FCP](https://web.dev/fcp/) (First Contentful Paint)
- [TTFB](https://web.dev/time-to-first-byte/) (Time To First Byte)
- Device Memory
- Device CPU
- Effective Connection Type

## Installation

```jsx
npm install @bbc/web-vitals --save
```

## Props

| Argument          | Type     | Required | Default     | Example             |
| ----------------- | -------- | -------- | ----------- | ------------------- |
| enabled           | Boolean  | No       | false       | `{ enabled: true }` |
| reportingEndpoint | String   | Yes      | N/A         | `{ reportingEndpoint: 'https://url.to.report.to/analytics' }` |
| loggerCallback    | Function | No       | `() => {}`  | `{ loggerCallback: (error) => console.error(error) }` |
| sampleRate        | Integer  | No       | 100         | `{ sampleRate: 5 }` |
| reportParams      | Object   | No       | `undefined` | `{ reportParams: { pageType: 'STY' }` |

## Usage

The hook can be configured in a number of ways:

- `enabled` - setting this to `true` will enable sending these metrics to the reporting endpoint. This is so that the reporting functionality can be turned on only when users have agreed to the appropriate privacy and tracking settings where appropriate.
- `reportingEndpoint` - the endpoint you wish to send your metrics to
- `loggerCallback` - a function that will be called whenever an attempt to send the metrics fails.
- `sampleRate` - providing a number between 1-100 will set the percentage of sampling, to prevent overloading the backend reporting server. e.g. a `sampleRate` of `5` will mean that metrics for 5% of requests will be sent to the reporting server.
- `reportParams` - an object that will define query string parameters appended to the reporting endpoint. As an example, providing `{ pageType: 'STY' }` will cause `?pageType=STY` to be appended to the reporting endpoint.

```jsx
import useWebVitals from "@bbc/web-vitals";
import logger from "./logger";

const Page = props => {
  const enabled = isOnClient() && hasUserAcceptedTracking();
  useWebVitals({
    enabled,
    reportingEndpoint: 'https://url.to.report.to/analytics',
    loggerCallback = logger.error,
    sampleRate: 50,
    reportParams: { pageType: 'STY' },
  });

  return (
    <PageComponents />
  );
};
```

### When to use this utility

This utility should ideally be used as close to the top-level of your app as is practical. You should follow due diligence in regards to checking if your site visitor needs to accept any personalisation or tracking permissions under relevant local laws, and use this in determining the value of the `enabled` prop.

`useEffect` hooks are only run client-side, but when using this hook in combination with Server Side Rendering, you may wish to also include a check of whether the code is running client-side in order to ensure that you do not get inconsistencies between your server's capabilities and the user's.

### When not to use this utility

In non-page-level components, especially where these components may be added multiple times to a page.

In situations where users have not provided permission for the relevant personalisation or tracking permissions that may be required under relevant local laws.

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new utilities, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead repository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).
