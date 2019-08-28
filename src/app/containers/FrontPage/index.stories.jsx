import React from 'react';
import { storiesOf } from '@storybook/react';
import igboData from '../../../../data/igbo/frontpage';
import pidginData from '../../../../data/pidgin/frontpage';
import thaiData from '../../../../data/thai/frontpage';
import yorubaData from '../../../../data/yoruba/frontpage';

import filterUnknownContentTypes from '../../lib/utilities/preprocessor/rules/filterContentType';
import filterEmptyGroupItems from '../../lib/utilities/preprocessor/rules/filterEmptyGroupItems';
import applySquashTopstories from '../../lib/utilities/preprocessor/rules/topstories';
import preprocess from '../../lib/utilities/preprocessor';
import FrontPage from '.';

const preprocessorRules = [
  filterUnknownContentTypes,
  filterEmptyGroupItems,
  applySquashTopstories,
];

storiesOf('Pages|Front Page', module)
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
        pageType="frontPage"
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
        pageType="frontPage"
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
        pageType="frontPage"
      />
    );
  })
  .add('Thai', () => {
    const thaiFrontPageData = preprocess(thaiData, preprocessorRules);

    const data = {
      pageData: thaiFrontPageData,
      status: 200,
    };

    return (
      <FrontPage
        data={data}
        service="thai"
        isAmp={false}
        loading={false}
        error=""
        pageType="frontPage"
        dials={dials}
      />
    );
  });
