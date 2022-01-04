import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import { PhotoGalleryPage } from '..';
import pageData from './fixtureData';
import { PHOTO_GALLERY_PAGE } from '#app/routes/utils/pageTypes';

const Component = () => (
  <BrowserRouter>
    <PhotoGalleryPage
      pageType={PHOTO_GALLERY_PAGE}
      isAmp={false}
      pathname="/path"
      status={200}
      pageData={pageData}
      service="azeri"
    />
  </BrowserRouter>
);

export default {
  Component,
  title: 'Pages/Photo Gallery Page',
  decorators: [story => <WithTimeMachine>{story()}</WithTimeMachine>],
};

export const Azeri = Component;
