/* eslint-disable no-shadow */
import { useEffect, useState } from 'react';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import { Curation } from '#app/models/types/curationData';
import { Services } from '#app/models/types/global';
import { StoryArgs, StoryProps } from '../../models/types/storybook';
import HomePage from './HomePage';
import PageLayoutWrapper from '#app/components/PageLayoutWrapper';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import ThemeProvider from '#app/components/ThemeProvider';

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

const Component = ({ service, variant, isLite }: StoryProps) => {
  const [pageData, setPageData] = useState({});

  useEffect(() => {
    const loadPageData = async () => {
      const response = await fetch(
        `data/${service}/homePage/${variant === 'default' ? 'index' : variant}.json`,
      );
      const { data } = await response.json();

      overrideRadioSchedule(data, service);

      setPageData(data);
    };

    loadPageData();
  }, [service, variant]);

  if (Object.keys(pageData).length === 0) {
    return <>Unable to render Homepage for {service}</>;
  }

  return (
    <ServiceContextProvider service={service} variant={variant}>
      <RequestContextProvider
        isLite={isLite}
        service={service}
        variant={variant}
        pageType={HOME_PAGE}
        pathname={`/${service}`}
      >
        <ThemeProvider service={service} variant={variant}>
          <PageLayoutWrapper
            // @ts-expect-error - Fixture data
            pageData={pageData}
            status={200}
          >
            <HomePage
              // @ts-expect-error - Fixture data
              pageData={pageData}
            />
          </PageLayoutWrapper>
        </ThemeProvider>
      </RequestContextProvider>
    </ServiceContextProvider>
  );
};

export default {
  Component,
  title: 'Pages/Home Page',
  parameters: { layout: 'fullscreen' },
};

export const Example = {
  render: (_: StoryArgs, { service, variant, isLite }: StoryProps) => (
    <Component service={service} variant={variant} isLite={isLite} />
  ),
  parameters: { chromatic: { disableSnapshot: true } },
};

// This story is for chromatic testing purposes only
export const Test = () => <Component service="kyrgyz" variant="default" />;

Test.globals = {
  toggles: {
    mostRead: {
      enabled: true,
    },
  },
  service: { service: 'kyrgyz' },
};

Test.tags = ['!dev'];

export const TestWSLanguages = () => (
  <Component service="ws" variant="default" />
);

TestWSLanguages.globals = {
  service: { service: 'ws' },
};

TestWSLanguages.tags = ['!dev'];

export const TestLite = () => (
  <Component service="gahuza" variant="default" isLite />
);

TestLite.globals = {
  service: { service: 'gahuza' },
};

// TestLite.tags = ['!dev'];

TestLite.parameters = {
  chromatic: {
    viewports: [
      399, // Group 1
      899, // Group 3
    ],
  },
};
