import React, { useState, useEffect } from 'react';
import fetchMock from 'fetch-mock';
import { storiesOf } from '@storybook/react';
import { BrowserRouter, Route } from 'react-router-dom';
import igboData from '#data/igbo/frontpage';
import pidginData from '#data/pidgin/frontpage';
import thaiData from '#data/thai/frontpage';
import yorubaData from '#data/yoruba/frontpage';
import punjabiData from '#data/punjabi/frontpage';
import FrontPage from '.';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import getInitialData from '#app/routes/home/getInitialData';

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
    const fetchData = async () => {
      fetchMock.getOnce(
        `${window.location.origin}/${service}.json`,
        serviceDatasets[service],
      );
      const { pageData } = await getInitialData(service);
      fetchMock.restore();
      setData(pageData);
    };
    fetchData();
  }, [service]);

  return data ? children(data) : null;
};

const stories = storiesOf('Pages|Front Page', module).addDecorator(story => (
  <WithTimeMachine>{story()}</WithTimeMachine>
));

Object.keys(serviceDatasets).forEach(service => {
  stories.add(service, () => {
    return (
      <BrowserRouter>
        <Route path="/:service">
          <DataWrapper service={service}>
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
