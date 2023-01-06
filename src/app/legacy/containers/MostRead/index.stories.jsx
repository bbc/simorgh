import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import MostReadContainer from '.';

const staticMostReadURL = (service, variant) =>
  variant !== 'default'
    ? `./data/${service}/mostRead/${variant}.json`
    : `./data/${service}/mostRead/index.json`;

// eslint-disable-next-line react/prop-types
const Component = ({ service, variant, columnLayout }) => (
  <ToggleContextProvider>
    <RequestContextProvider
      bbcOrigin={`http://localhost/${service}/articles/c0000000000o`}
      id="c0000000000o"
      isAmp={false}
      pageType={ARTICLE_PAGE}
      service={service}
      statusCode={200}
      pathname={`/${service}`}
      variant={variant}
    >
      <ServiceContextProvider service={service} variant={variant}>
        <MostReadContainer
          mostReadEndpointOverride={staticMostReadURL(service, variant)}
          columnLayout={columnLayout}
        />
      </ServiceContextProvider>
    </RequestContextProvider>
  </ToggleContextProvider>
);

export default {
  title: 'Containers/Most Read',
  Component,
  parameters: { chromatic: { disable: true } },
  decorators: [withKnobs, withServicesKnob({ defaultService: 'pidgin' })],
};

export const FrontPage2Columns = props => (
  <Component {...props} columnLayout="twoColumn" />
);

export const ArticlePage5Columns = props => (
  <Component {...props} columnLayout="multiColumn" />
);

export const StoryPage1Column = props => (
  <Component {...props} columnLayout="oneColumn" />
);
