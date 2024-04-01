/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import Url from 'url-parse';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import fetch from 'node-fetch';
import { Curation } from '#app/models/types/curationData';
import { Services } from '#app/models/types/global';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import ThemeProvider from '../../components/ThemeProvider';
import { StoryProps } from '../../models/types/storybook';
import HomePage from '.';

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

const overrideRadioSchedule = (
  data: { curations: Curation[] },
  service: Services,
) => {
  const { radioSchedule } =
    data.curations.find(({ radioSchedule }) => radioSchedule) || {};

  if (radioSchedule && radioSchedule.length === 4) {
    const currentTime = Date.now();

    // First radio program is tomorrow
    radioSchedule[0].state = 'next';
    const originalStartTime = new Date(radioSchedule[0].startTime);
    const tomorrow = new Date(currentTime + ONE_DAY_IN_MILLISECONDS);
    tomorrow.setHours(originalStartTime.getHours());
    tomorrow.setMinutes(originalStartTime.getMinutes());
    tomorrow.setSeconds(originalStartTime.getSeconds());
    tomorrow.setMilliseconds(originalStartTime.getMilliseconds());
    radioSchedule[0].startTime = new Date(tomorrow).toISOString();

    // Second radio programme is live
    radioSchedule[1].state = 'live';
    radioSchedule[1].startTime = new Date(currentTime).toISOString();
    radioSchedule[1].link = `${service}/bbc_${service}_radio/liveradio`;
  }
};

const Component = ({ service, variant }: StoryProps) => {
  const [pageData, setPageData] = useState({});

  useEffect(() => {
    const loadPageData = async () => {
      const response = await fetch(
        new Url(`data/${service}/homePage/index.json`),
      );
      const { data } = await response.json();

      overrideRadioSchedule(data, service);

      setPageData(data);
    };

    loadPageData();
  }, [service]);

  if (Object.keys(pageData).length === 0) {
    return <>Unable to render Homepage for {service}</>;
  }

  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <HomePage
          service={service}
          variant={variant}
          pageType={HOME_PAGE}
          status={200}
          isAmp={false}
          pathname={`/${service}`}
          pageData={pageData}
        />
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export default {
  Component,
  title: 'Pages/Home Page',
};

export const Example = (_, { service, variant }: StoryProps) => (
  <Component service={service} variant={variant} />
);
