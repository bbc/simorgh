import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import afriqueData from '#data/afrique/cpsAssets/48465371';
import { getLocalMostReadEndpoint } from '#lib/utilities/getMostReadUrls';
import FeatureIdxPage from '.';

const stories = storiesOf(
  'Pages|Feature Idx Page',
  module,
).addDecorator(story => <WithTimeMachine>{story()}</WithTimeMachine>);

const service = 'afrique';
const variant = 'default';
stories.add(`${service}`, () => (
  <BrowserRouter>
    <FeatureIdxPage
      isAmp={false}
      pageType="FIX"
      status={200}
      pathname="/afrique/48465371"
      service={service}
      variant={variant}
      pageData={afriqueData}
      mostReadEndpointOverride={getLocalMostReadEndpoint({
        service,
        variant,
      })}
    />
  </BrowserRouter>
));
