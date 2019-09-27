import React from 'react';
import { storiesOf } from '@storybook/react';
import igboData from '#data/igbo/frontpage';
import pidginData from '#data/pidgin/frontpage';
import thaiData from '#data/thai/frontpage';
import yorubaData from '#data/yoruba/frontpage';
import punjabiData from '#data/punjabi/frontpage';
import addIdsToItems from '#lib/utilities/preprocessor/rules/frontPage/addIdsToItems';
import filterUnknownContentTypes from '#lib/utilities/preprocessor/rules/frontPage/filterContentType';
import filterEmptyGroupItems from '#lib/utilities/preprocessor/rules/frontPage/filterEmptyGroupItems';
import applySquashTopstories from '#lib/utilities/preprocessor/rules/frontPage/topstories';
import preprocess from '#lib/utilities/preprocessor';
import FrontPage from '.';

const preprocessorRules = [
  filterUnknownContentTypes,
  addIdsToItems,
  filterEmptyGroupItems,
  applySquashTopstories,
];

const serviceDatasets = {
  igbo: igboData,
  yoruba: yorubaData,
  pidgin: pidginData,
  thai: thaiData,
  punjabi: punjabiData,
};

const stories = storiesOf('Pages|Front Page', module);
Object.keys(serviceDatasets).forEach(service => {
  stories.add(service, () => {
    const frontPageData = preprocess(
      serviceDatasets[service],
      preprocessorRules,
    );

    const data = {
      pageData: frontPageData,
      status: 200,
    };

    return (
      <FrontPage
        data={data}
        service={service}
        isAmp={false}
        loading={false}
        error={null}
        pageType="frontPage"
      />
    );
  });
});
