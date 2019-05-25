import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import igboData from '../../../../data/prod/igbo/frontpage';
import yorubaData from '../../../../data/prod/yoruba/frontpage';
import pidginData from '../../../../data/prod/pidgin/frontpage';

import FrontPage from '.';

storiesOf('Front Page', module)
  .add('Igbo', () => {
    const data = {
      pageData: igboData,
      status: 200,
    };

    return (
      <FrontPage
        data={data}
        service="igbo"
        isAmp={false}
        loading={false}
        error=""
      />
    );
  })
  .add('Yoruba', () => {
    const data = {
      pageData: yorubaData,
      status: 200,
    };

    return (
      <FrontPage
        data={data}
        service="yoruba"
        isAmp={false}
        loading={false}
        error=""
      />
    );
  })
  .add('Pidgin', () => {
    const data = {
      pageData: pidginData,
      status: 200,
    };

    return (
      <FrontPage
        data={data}
        service="pidgin"
        isAmp={false}
        loading={false}
        error=""
      />
    );
  });
