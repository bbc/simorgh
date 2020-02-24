import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter, Route } from 'react-router-dom';
import igboData from '#data/igbo/frontpage';
import pidginData from '#data/pidgin/frontpage';
import thaiData from '#data/thai/frontpage';
import yorubaData from '#data/yoruba/frontpage';
import punjabiData from '#data/punjabi/frontpage';
import serbianCyrData from '#data/serbian/frontpage/cyr';
import serbianLatData from '#data/serbian/frontpage/lat';
import { service as igboConfig } from '#lib/config/services/igbo';
import { service as pidginConfig } from '#lib/config/services/pidgin';
import { service as thaiConfig } from '#lib/config/services/thai';
import { service as yorubaConfig } from '#lib/config/services/yoruba';
import { service as punjabiConfig } from '#lib/config/services/punjabi';
import { service as serbianConfig } from '#lib/config/services/serbian';
import FrontPage from '.';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import getInitialData from '#app/routes/home/getInitialData';

const serviceDatasets = {
  igbo: { default: igboData },
  yoruba: { default: yorubaData },
  pidgin: { default: pidginData },
  thai: { default: thaiData },
  punjabi: { default: punjabiData },
  serbian: {
    cyr: serbianCyrData,
    lat: serbianLatData,
  },
};

const serviceConfig = {
  igbo: igboConfig,
  pidgin: pidginConfig,
  thai: thaiConfig,
  yoruba: yorubaConfig,
  punjabi: punjabiConfig,
  serbian: serbianConfig,
};

const getPageData = async (service, variant) => {
  const { fetch } = window;
  window.fetch = () =>
    Promise.resolve({
      status: 200,
      json: () => serviceDatasets[service][variant],
    }); // stub fetch
  const { pageData } = await getInitialData('some-front-page-path');
  window.fetch = fetch; // restore fetch
  return pageData;
};

// eslint-disable-next-line react/prop-types
const DataWrapper = ({ service, variant, children }) => {
  const [data, setData] = useState();

  useEffect(() => {
    (async () => setData(await getPageData(service, variant)))();
  }, [service, variant]);

  return data ? children(data) : null;
};

const stories = storiesOf('Pages|Front Page', module).addDecorator(story => (
  <WithTimeMachine>{story()}</WithTimeMachine>
));

Object.keys(serviceDatasets).forEach(service => {
  Object.keys(serviceDatasets[service]).forEach(variant => {
    stories.add(`${service} ${variant === 'default' ? '' : variant}`, () => {
      return (
        <BrowserRouter>
          <Route path="/:service">
            <DataWrapper service={service} variant={variant}>
              {frontPageData => (
                <FrontPage
                  pageData={frontPageData}
                  status={200}
                  service={service}
                  isAmp={false}
                  loading={false}
                  error={null}
                  pageType="frontPage"
                  pathname={serviceConfig[service][variant].navigation[0].url}
                  mostReadEndpointOverride={`./data/${service}/mostRead/index.json`}
                />
              )}
            </DataWrapper>
          </Route>
        </BrowserRouter>
      );
    });
  });
});
