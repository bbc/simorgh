import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import MediaAssetPage from '.';
import pageData from './fixtureData';
import { MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';

// eslint-disable-next-line react/prop-types
const Component = ({ isAmp = false } = {}) => (
  <BrowserRouter>
    <MediaAssetPage
      pageType={MEDIA_ASSET_PAGE}
      isAmp={isAmp}
      pathname="/pathname"
      status={200}
      pageData={pageData}
      service="pidgin"
    />
  </BrowserRouter>
);

export default {
  Component,
  title: 'Pages/Media Asset Page',
  decorators: [story => <WithTimeMachine>{story()}</WithTimeMachine>],
};

export const Canonical = Component;

export const Amp = () => <Component isAmp />;
Amp.decorators = [AmpDecorator];
