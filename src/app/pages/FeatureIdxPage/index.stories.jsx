import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import afriqueData from '#data/afrique/cpsAssets/48465371';
import FeatureIdxPage from '.';
import { FEATURE_INDEX_PAGE } from '#app/routes/utils/pageTypes';

const stories = storiesOf(
  'Pages/Feature Idx Page',
  module,
).addDecorator(story => <WithTimeMachine>{story()}</WithTimeMachine>);

const service = 'afrique';
const variant = 'default';

stories.add(`${service}`, () => (
  <BrowserRouter>
    <FeatureIdxPage
      isAmp={false}
      pageType={FEATURE_INDEX_PAGE}
      status={200}
      pathname="/afrique/48465371"
      service={service}
      variant={variant}
      pageData={afriqueData}
    />
  </BrowserRouter>
));
