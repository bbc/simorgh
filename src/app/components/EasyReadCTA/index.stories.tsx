import React from 'react';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import EasyReadCTA from '.';
import readme from './README.md';

export const Standard = () => (
  <RequestContextProvider
    pathname="/mundo/afrique/cdwrpl7qwqqo"
    pageType="article"
    service="afrique"
  >
    <EasyReadCTA
      easyReadAssetId="crkdy3r685jo"
      originalAssetId="cy0grkwd3zlo"
    />
  </RequestContextProvider>
);

export const Easy = () => (
  <RequestContextProvider
    pathname="/mundo/afrique/cdwrpl7qwqqo"
    pageType="article"
    service="afrique"
  >
    <EasyReadCTA originalAssetId="cy0grkwd3zlo" />{' '}
  </RequestContextProvider>
);

export default {
  title: 'Components/EasyReadCTA',
  Standard,
  parameters: {
    docs: { readme },
  },
};
