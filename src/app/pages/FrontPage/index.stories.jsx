import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter, Route } from 'react-router-dom';
import igboData from '#data/igbo/frontpage';
import pidginData from '#data/pidgin/frontpage';
import addIdsToItems from '#lib/utilities/preprocessor/rules/addIdsToItems';
import thaiData from '#data/thai/frontpage';
import yorubaData from '#data/yoruba/frontpage';
import punjabiData from '#data/punjabi/frontpage';
import filterUnknownContentTypes from '#lib/utilities/preprocessor/rules/filterContentType';
import filterEmptyGroupItems from '#lib/utilities/preprocessor/rules/filterEmptyGroupItems';
import applySquashTopstories from '#lib/utilities/preprocessor/rules/topstories';
import preprocess from '#lib/utilities/preprocessor';
import FrontPage from '.';
import WithTimeMachine from '#testHelpers/withTimeMachine';

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

// eslint-disable-next-line react/prop-types
const DataWrapper = ({ service, children }) => {
  const [data, setData] = useState();

  useEffect(() => {
    preprocess(serviceDatasets[service], preprocessorRules).then(setData);
  }, [service]);

  return data ? children(data) : null;
};

const stories = storiesOf('Pages|Front Page', module).addDecorator(story => (
  <WithTimeMachine>{story()}</WithTimeMachine>
));

const mostReadOverrides = service => ({
  endpointOverride: `./data/${service}/mostRead/index.json`,
  ignoreRecordIsFresh: true,
});

Object.keys(serviceDatasets).forEach(service => {
  stories.add(service, () => {
    return (
      <BrowserRouter>
        <Route path="/:service">
          <DataWrapper service={service}>
            {frontPageData => (
              <FrontPage
                pageData={frontPageData}
                mostReadOverrides={mostReadOverrides(service)}
                status={200}
                service={service}
                isAmp={false}
                loading={false}
                error={null}
                pageType="frontPage"
              />
            )}
          </DataWrapper>
        </Route>
      </BrowserRouter>
    );
  });
});
