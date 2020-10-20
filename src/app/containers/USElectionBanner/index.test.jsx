import React from 'react';
import { isNull, shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import ElectionBanner from './index';
import { ToggleContext } from '#contexts/ToggleContext';

const MockOembedData = {
  version: '1.0',
  type: 'rich',
  width: 320,
  height: 240,
  html: '<div>Hello</div>',
};

// eslint-disable-next-line react/prop-types
const ElectionsBannerWithContext = ({ oembed }) => (
  <ToggleContext.Provider
    value={{
      toggleState: {
        us2020ElectionBanner: { enabled: true },
      },
    }}
  >
    <ElectionBanner oembed={oembed} />
  </ToggleContext.Provider>
);

describe('ElectionBanner', () => {
  describe('with no oEmbed data', () => {
    isNull('should return null', <ElectionsBannerWithContext />);
  });

  describe('with oEmbed data', () => {
    shouldMatchSnapshot(
      'should render correctly',
      <ElectionsBannerWithContext oembed={MockOembedData} />,
    );
  });
});
