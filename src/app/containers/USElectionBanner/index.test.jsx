import React from 'react';
import { isNull, shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import ElectionBanner from './index';

// Contexts
import { ToggleContext } from '#contexts/ToggleContext';
import { RequestContext } from '#contexts/RequestContext';

const MockOembedData = {
  version: '1.0',
  type: 'rich',
  width: 320,
  height: 240,
  html: '<div>Hello</div>',
};

// eslint-disable-next-line react/prop-types
const ElectionsBannerWithContext = ({ oembed, isAmp = false }) => (
  <RequestContext.Provider value={{ isAmp: isAmp }}>
    <ToggleContext.Provider
      value={{
        toggleState: {
          us2020ElectionBanner: { enabled: true },
        },
      }}
    >
      <ElectionBanner oembed={oembed} />
    </ToggleContext.Provider>
  </RequestContext.Provider>
);

describe('ElectionBanner', () => {
  describe('with no oEmbed data', () => {
    isNull('should return null', <ElectionsBannerWithContext />);
  });

  describe('when on AMP', () => {
    isNull(
      'should return null',
      <ElectionsBannerWithContext oembed={MockOembedData} isAmp={true} />,
    );
  });

  describe('with oEmbed data', () => {
    shouldMatchSnapshot(
      'should render correctly',
      <ElectionsBannerWithContext oembed={MockOembedData} />,
    );
  });
});
