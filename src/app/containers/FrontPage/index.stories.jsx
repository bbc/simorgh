import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import fixtureData from '../../../../data/prod/pidgin/frontpage';
import FrontPage from '.';

storiesOf('Front Page', module).add('default', () => {
  const data = {
    pageData: fixtureData,
    status: 200,
  };

  return (
    <FrontPage
      data={data}
      service="news"
      isAmp={false}
      loading={false}
      error=""
    />
  );
});
