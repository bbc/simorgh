import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';
import HeaderContainer from '.';
import withServicesDecorator from '#app/utilities/withServicesDecorator';

// eslint-disable-next-line react/prop-types
const Component = (_, { service }) => {
  return (
    <ToggleContextProvider>
      <RequestContextProvider
        isAmp={false}
        pageType={FRONT_PAGE}
        service={service}
        bbcOrigin="https://www.test.bbc.com"
      >
        <HeaderContainer />
      </RequestContextProvider>
    </ToggleContextProvider>
  );
};

export default {
  title: 'Containers/Header',
  Component,
  parameters: {
    chromatic: { disable: true },
  },
  decorators: [withServicesDecorator],
};

export const Header = props => <Component {...props} />;
