import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import WithTimeMachine from '#testHelpers/withTimeMachine';

import { ToggleContextProvider } from '#contexts/ToggleContext';
import { MediaAssetPage } from '..';
import pageData from './fixtureData';

const defaultToggles = {
  mediaPlayer: {
    enabled: true,
  },
};

const isAmp = (platform) => platform === 'AMP';

const platforms = ['Canonical', 'AMP'];

platforms.forEach((platform) => {
  const mapStories = storiesOf(`Pages|Media Asset Page/${platform}`, module);

  mapStories.addDecorator((story) => (
    <WithTimeMachine>{story()}</WithTimeMachine>
  ));

  if (isAmp(platform)) {
    mapStories.addDecorator(AmpDecorator);
  }

  mapStories.add('default', () => {
    return (
      <ToggleContextProvider
        value={{ toggleState: defaultToggles }}
        service="pidgin"
        origin="https://www.test.bbc.com"
      >
        <BrowserRouter>
          <MediaAssetPage
            pageType="MAP"
            isAmp={isAmp(platform)}
            pathname="/pathname"
            status={200}
            pageData={pageData}
            service="pidgin"
          />
        </BrowserRouter>
      </ToggleContextProvider>
    );
  });
});
