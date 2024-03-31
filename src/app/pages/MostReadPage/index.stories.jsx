import React, { useEffect, useContext, useState } from 'react';
import fetch from 'node-fetch';
import Url from 'url-parse';
import { BrowserRouter } from 'react-router-dom';
import { MOST_READ_PAGE } from '#app/routes/utils/pageTypes';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import MostReadPage from '.';

const Component = () => {
  const { service } = useContext(ServiceContext);
  const { variant = 'default' } = useContext(RequestContext);
  const [pageData, setPageData] = useState({});

  useEffect(() => {
    const loadPageData = async () => {
      const response = await fetch(
        new Url(
          `data/${service}/mostRead/${
            variant === 'default' ? 'index' : variant
          }.json`,
        ).toString(),
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
    <BrowserRouter>
      <MostReadPage
        pageType={MOST_READ_PAGE}
        isAmp={false}
        pathname={`/${service}/popular/read`}
        status={200}
        pageData={pageData}
        service={service}
        variant={variant}
      />
    </BrowserRouter>
  );
};

export default {
  Component,
  title: 'Pages/Most Read Page',
};

export const Example = () => <Component />;
