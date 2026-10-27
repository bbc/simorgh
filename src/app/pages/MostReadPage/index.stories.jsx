import { useEffect, useState } from 'react';
import { MOST_READ_PAGE } from '#app/routes/utils/pageTypes';
import MostReadPage from './MostReadPage';
import PageLayoutWrapper from '#app/components/PageLayoutWrapper';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';

const Component = ({ service, variant }) => {
  const [pageData, setPageData] = useState({});

  useEffect(() => {
    const loadPageData = async () => {
      const response = await fetch(
        `data/${service}/mostRead/${
          variant === 'default' ? 'index' : variant
        }.json`,
      );

      const { data } = await response.json();
      setPageData(data);
    };

    loadPageData();
  }, [service, variant]);

  if (Object.keys(pageData).length === 0) {
    return <>Unable to render Most Read Page for {service}</>;
  }

  return (
    <ServiceContextProvider service={service} variant={variant}>
      <PageLayoutWrapper pageData={pageData} status={200}>
        <MostReadPage
          pageType={MOST_READ_PAGE}
          isAmp={false}
          pathname={`/${service}/popular/read`}
          status={200}
          pageData={pageData}
          service={service}
        />
      </PageLayoutWrapper>
    </ServiceContextProvider>
  );
};

export default {
  Component,
  title: 'Pages/Most Read Page',
  parameters: { layout: 'fullscreen' },
};

export const Example = {
  render: (_, { service, variant }) => (
    <Component service={service} variant={variant} />
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

// This story is for chromatic testing purposes only
export const Test = () => <Component service="pidgin" variant="default" />;
Test.globals = {
  service: { service: 'pidgin' },
};

Test.tags = ['!dev'];
