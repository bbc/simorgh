import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import afriqueData from '#data/afrique/cpsAssets/reduced-48465371';
import { FEATURE_INDEX_PAGE } from '#app/routes/utils/pageTypes';
import FeatureIdxPage from '.';

const Component = (
  <BrowserRouter>
    <FeatureIdxPage
      isAmp={false}
      pageType={FEATURE_INDEX_PAGE}
      status={200}
      pathname="/afrique/48465371"
      service="afrique"
      pageData={afriqueData}
    />
  </BrowserRouter>
);

export default {
  Component,
  title: 'Pages/Feature Idx Page',
  decorators: [story => <WithTimeMachine>{story()}</WithTimeMachine>],
};

export const Afrique = () => Component;
