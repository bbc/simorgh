import React, { useState, useEffect } from 'react';
import fetchMock from 'fetch-mock';
import { storiesOf } from '@storybook/react';
import { BrowserRouter, Route } from 'react-router-dom';
import igboData from '#data/igbo/frontpage';
import pidginData from '#data/pidgin/frontpage';
import thaiData from '#data/thai/frontpage';
import yorubaData from '#data/yoruba/frontpage';
import punjabiData from '#data/punjabi/frontpage';
import serbianCyrData from '#data/serbian/frontpage/cyr';
import serbianLatData from '#data/serbian/frontpage/lat';
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

// eslint-disable-next-line react/prop-types
const DataWrapper = ({ service, variant, children }) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      fetchMock.getOnce(
        `${window.location.origin}/${service}/${variant}.json`,
        serviceDatasets[service][variant],
      );
      const { pageData } = await getInitialData(`${service}/${variant}`);
      fetchMock.restore();
      setData(pageData);
    };
    fetchData();
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
                />
              )}
            </DataWrapper>
          </Route>
        </BrowserRouter>
      );
    });
  });
});
