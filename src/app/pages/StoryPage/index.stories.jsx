import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';

import { StoryPage } from '..';
import mundoPageData from './fixtureData/mundo';
import persianPageData from './fixtureData/persian';

const withSecondaryColumnsKnob = pageData => storyFn => {
  const options = {
    'without Top Stories': 'topStories',
    'without Features': 'features',
    'without Features & Top Stories': ['features', 'topStories'],
    default: '',
  };
  const selectedColumns = select(
    'Select secondary column options',
    options,
    '',
    'STY-SECONDARY-COLUMN',
  );

  const secondaryColumn = {
    ...(!selectedColumns.includes('topStories') && {
      topStories: pageData.secondaryColumn.features,
    }),
    ...(!selectedColumns.includes('features') && {
      features: pageData.secondaryColumn.features,
    }),
  };

  const storyProps = {
    data: {
      ...pageData,
      secondaryColumn,
    },
  };
  return storyFn(storyProps);
};
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
  return storiesOf('Pages/Story Page', module)
    .addDecorator(story => <WithTimeMachine>{story()}</WithTimeMachine>)
    .addDecorator(withKnobs)
    .addDecorator(withSecondaryColumnsKnob(pageData))
    .add(service, ({ data }) => {
      return (
        <BrowserRouter>
          <StoryPage
            pageType="STY"
            isAmp={false}
            pathname="/path"
            status={200}
            pageData={data}
            service={service}
            mostReadEndpointOverride="./data/mundo/mostRead/index.json"
          />
        </BrowserRouter>
      );
    });
});
