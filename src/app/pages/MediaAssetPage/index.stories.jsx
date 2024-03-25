import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import { MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import MediaAssetPage from '.';
import pageData from './fixtureData';

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
  parameters: {
    chromatic: {
      delay: 15000,
    },
  },
};

export const Canonical = Component;

export const Amp = () => <Component isAmp />;
Amp.decorators = [AmpDecorator];
