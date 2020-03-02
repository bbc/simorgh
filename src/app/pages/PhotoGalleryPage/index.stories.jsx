import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import { PhotoGalleryPage } from '..';
import pageData from './fixtureData';

const pglStories = storiesOf('Pages|Photo Gallery Page', module);

pglStories.addDecorator(story => <WithTimeMachine>{story()}</WithTimeMachine>);

pglStories.add('Azeri', () => {
  return (
    <BrowserRouter>
      <PhotoGalleryPage
        pageType="PGL"
        isAmp={false}
        pathname="/path"
        status={200}
        pageData={pageData}
        service="azeri"
      />
    </BrowserRouter>
  );
});
