import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import { PhotoGalleryPage } from '..';
import pageData from './fixtureData';
import { PHOTO_GALLERY_PAGE } from '#app/routes/utils/pageTypes';

const pglStories = storiesOf('Pages/Photo Gallery Page', module);

pglStories.addDecorator(story => <WithTimeMachine>{story()}</WithTimeMachine>);

pglStories.add('Azeri', () => {
  return (
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
});
