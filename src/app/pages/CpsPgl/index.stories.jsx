import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';

import CPSPgl from '.';
import pageData from './fixtureData';

const pglStories = storiesOf('Pages|Photo Gallery Page', module);

pglStories.addDecorator(story => <WithTimeMachine>{story()}</WithTimeMachine>);

pglStories.add('PGL', () => {
  return (
    <BrowserRouter>
      <CPSPgl
        pageType="PGL"
        isAmp={false}
        pathname="/pathname"
        status={200}
        pageData={pageData}
        service="afrique"
      />
    </BrowserRouter>
  );
});
