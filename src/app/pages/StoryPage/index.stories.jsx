import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';

import { StoryPage } from '..';
import mundoPageData from './fixtureData/mundo';
import persianPageData from './fixtureData/persian';

const styStories = storiesOf('Pages|Story Page', module);

styStories.addDecorator(story => <WithTimeMachine>{story()}</WithTimeMachine>);

[
  {
    service: 'mundo',
    pageData: mundoPageData,
  },
  {
    service: 'persian',
    pageData: persianPageData,
  },
].forEach(({ service, pageData }) => {
  styStories.add(service, () => {
    return (
      <BrowserRouter>
        <StoryPage
          pageType="STY"
          isAmp={false}
          pathname="/path"
          status={200}
          pageData={pageData}
          service={service}
          mostReadEndpointOverride="./data/mundo/mostRead/index.json"
        />
      </BrowserRouter>
    );
  });
});
