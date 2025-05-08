import React from 'react';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import EasyReadCTA from '.';

export const Component = () => (
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

export const EasyComponent = () => (
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
  Component,
};
