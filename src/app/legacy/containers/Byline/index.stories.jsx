import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import BylineContainer from '.';

// eslint-disable-next-line react/prop-types
const Component = (_, { service }) => {
  const blocks = [{ name: 'John Smith', title: 'Art Editor' }];
  return (
    <RequestContextProvider
      isAmp={false}
      pageType={STORY_PAGE}
      service={service}
      statusCode={200}
      bbcOrigin="https://www.test.bbc.com"
      pathname="/pathname"
    >
      <BylineContainer service={service} blocks={blocks} />
    </RequestContextProvider>
  );
};

export default {
  Component,
  title: 'Containers/Byline',
  parameters: {
    chromatic: { disable: true },
  },
};

export const Byline = Component;
