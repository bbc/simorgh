import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';

import { StoryPage } from '..';
import pageData from './fixtureData';

const styStories = storiesOf('Pages|Story Page', module);

styStories.addDecorator(story => <WithTimeMachine>{story()}</WithTimeMachine>);

styStories.add('Mundo', () => {
  return (
    <BrowserRouter>
      <StoryPage
        pageType="STY"
        isAmp={false}
        pathname="/path"
        status={200}
        pageData={pageData}
        service="mundo"
      />
    </BrowserRouter>
  );
});
