import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { getLocalMostReadEndpoint } from '#lib/utilities/getUrlHelpers/getMostReadUrls';
import pidginMostReadData from '#data/pidgin/mostRead';
import zhongwenSimpData from '#data/zhongwen/mostRead/simp.json';
import { MOST_READ_PAGE } from '#app/routes/utils/pageTypes';
import MostReadPage from '.';

// eslint-disable-next-line react/prop-types
const Component = ({ service, pageData, variant } = {}) => (
  <BrowserRouter>
    <MostReadPage
      pageType={MOST_READ_PAGE}
      isAmp={false}
      pathname="/path"
      status={200}
      pageData={pageData}
      service={service}
      variant={variant}
      mostReadEndpointOverride={getLocalMostReadEndpoint({
        service,
        variant,
      })}
    />
  </BrowserRouter>
);

export default {
  Component,
  title: 'Pages/Most Read Page',
};

export const Pidgin = () => (
  <Component service="pidgin" pageData={pidginMostReadData} />
);
export const ZhongwenSimple = () => (
  <Component service="zhongwen" variant="simp" pageData={zhongwenSimpData} />
);
