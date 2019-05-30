import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import igboData from '../../../../data/prod/igbo/frontpage';
import yorubaData from '../../../../data/prod/yoruba/frontpage';
import pidginData from '../../../../data/prod/pidgin/frontpage';
import filterUnknownCpsTypes from '../../lib/utilities/preprocessor/rules/cpstypes';
import filterEmptyGroupItems from '../../lib/utilities/preprocessor/rules/filterEmptyGroupItems';
import applySquashTopstories from '../../lib/utilities/preprocessor/rules/topstories';
import preprocess from '../../lib/utilities/preprocessor';
import FrontPage from '.';

const preprocessorRules = [
  filterUnknownCpsTypes,
  filterEmptyGroupItems,
  applySquashTopstories,
];

storiesOf('Front Page', module)
  .add('Igbo', () => {
    const igboFrontPageData = preprocess(igboData, preprocessorRules);

    const data = {
      pageData: igboFrontPageData,
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
    const yorubaFrontPageData = preprocess(yorubaData, preprocessorRules);

    const data = {
      pageData: yorubaFrontPageData,
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
    const pidginFrontPageData = preprocess(pidginData, preprocessorRules);

    const data = {
      pageData: pidginFrontPageData,
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
