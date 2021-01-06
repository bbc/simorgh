import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import MediaAssetPage from '.';
import pageData from './fixtureData';
import { MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';

const isAmp = platform => platform === 'AMP';

const platforms = ['Canonical', 'AMP'];

platforms.forEach(platform => {
  const mapStories = storiesOf(`Pages/Media Asset Page/${platform}`, module);

  mapStories.addDecorator(story => (
    <WithTimeMachine>{story()}</WithTimeMachine>
  ));

  if (isAmp(platform)) {
    mapStories.addDecorator(AmpDecorator);
  }

  mapStories.add('default', () => {
    return (
      <BrowserRouter>
        <MediaAssetPage
          pageType={MEDIA_ASSET_PAGE}
          isAmp={isAmp(platform)}
          pathname="/pathname"
          status={200}
          pageData={pageData}
          service="pidgin"
        />
      </BrowserRouter>
    );
  });
});
