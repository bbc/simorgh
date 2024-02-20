/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import Url from 'url-parse';
import { withKnobs } from '@storybook/addon-knobs';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import fetch from 'node-fetch';
import { CurationData } from '#app/models/types/curationData';
import { Services } from '#app/models/types/global';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import ThemeProvider from '../../components/ThemeProvider';
import { StoryProps } from '../../models/types/storybook';
import HomePage from '.';

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const TEN_MINUTES_IN_MILLISECONDS = 10 * 1000;

const overrideRadioSchedule = (
  data: { curations: CurationData[] },
  service: Services,
) => {
  const { radioSchedule } =
    data.curations.find(({ radioSchedule }) => radioSchedule) || {};

  if (radioSchedule && radioSchedule.length === 4) {
    const currentTime = Date.now();

    // First radio program is tomorrow
    radioSchedule[0].state = 'next';
    radioSchedule[0].startTime = new Date(
      currentTime + ONE_DAY_IN_MILLISECONDS,
    ).toISOString();

    // Second radio programme is live
    radioSchedule[1].state = 'live';
    radioSchedule[1].startTime = new Date(
      currentTime - TEN_MINUTES_IN_MILLISECONDS,
    ).toISOString();
    radioSchedule[1].link = `${service}/bbc_${service}_radio/liveradio`;

    // Radio Program started 1 day ago
    radioSchedule[2].startTime = new Date(
      currentTime - ONE_DAY_IN_MILLISECONDS,
    ).toISOString();
    // Radio Program started 2 days ago
    radioSchedule[3].startTime = new Date(
      currentTime - 2 * ONE_DAY_IN_MILLISECONDS,
    ).toISOString();
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
  decorators: [withKnobs, withServicesKnob({ defaultService: 'kyrgyz' })],
};

export const Example = ({ service, variant }: StoryProps) => (
  <Component service={service} variant={variant} />
);
