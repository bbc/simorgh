import React from 'react';
import pathOr from 'ramda/src/pathOr';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { data as serbianData } from '#data/serbian/frontpage/lat.json';
import { RequestContextProvider } from '#contexts/RequestContext';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';
import AmpDecorator from '../../../../../.storybook/helpers/ampDecorator';
import IndexPageSection from '.';

const Component = ({ service, data, isAmp = false }) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.com"
    isAmp={isAmp}
    pageType={FRONT_PAGE}
    service={service}
  >
    <ToggleContextProvider
      toggles={{
        eventTracking: { enabled: false },
      }}
    >
      <IndexPageSection group={data} sectionNumber={1} />
    </ToggleContextProvider>
  </RequestContextProvider>
);

export default {
  title: 'Containers/Front Page Section',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const Serbian = () => (
  <Component service="serbian" data={serbianData.article.content.groups[0]} />
);

export const LinkToMore = () => (
  <Component
    service="serbian"
    data={serbianData.article.content.groups.find(
      sec => pathOr(null, ['strapline', 'type'], sec) === 'LINK',
    )}
  />
);

export const UsefulLinks = () => (
  <Component
    service="serbian"
    data={serbianData.article.content.groups.find(
      sec => pathOr(null, ['semanticGroupName'], sec) === 'Useful links',
    )}
  />
);

// Amp
export const SerbianAmp = () => (
  <Component
    isAmp
    service="serbian"
    data={serbianData.article.content.groups[0]}
  />
);
SerbianAmp.decorators = [AmpDecorator];

export const LinkToMoreAmp = () => (
  <Component
    isAmp
    service="serbian"
    data={serbianData.article.content.groups.find(
      sec => pathOr(null, ['strapline', 'type'], sec) === 'LINK',
    )}
  />
);
LinkToMoreAmp.decorators = [AmpDecorator];

export const UsefulLinksAmp = () => (
  <Component
    isAmp
    service="serbian"
    data={serbianData.article.content.groups.find(
      sec => pathOr(null, ['semanticGroupName'], sec) === 'Useful links',
    )}
  />
);
UsefulLinksAmp.decorators = [AmpDecorator];
