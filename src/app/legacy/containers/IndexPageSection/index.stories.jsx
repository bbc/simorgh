import React from 'react';
import pathOr from 'ramda/src/pathOr';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';

import igboData from '#data/igbo/frontpage/index.json';
import pidginData from '#data/pidgin/frontpage/index.json';
import russianData from '#data/russian/frontpage/index.json';
import { RequestContextProvider } from '#contexts/RequestContext';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';
import AmpDecorator from '../../../../../.storybook/helpers/ampDecorator';
import IndexPageSection from '.';

// eslint-disable-next-line react/prop-types
const Component = ({ service, data, isAmp = false }) => (
  <ServiceContextProvider service={service}>
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
  </ServiceContextProvider>
);

export default {
  title: 'Containers/Front Page Section',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const Igbo = () => (
  <Component service="igbo" data={igboData.content.groups[0]} />
);

export const Pidgin = () => (
  <Component service="pidgin" data={pidginData.content.groups[0]} />
);

export const LinkToMore = () => (
  <Component
    service="pidgin"
    data={pidginData.content.groups.find(
      sec => pathOr(null, ['strapline', 'type'], sec) === 'LINK',
    )}
  />
);

export const UsefulLinks = () => (
  <Component
    service="igbo"
    data={russianData.content.groups.find(
      sec => pathOr(null, ['semanticGroupName'], sec) === 'Useful links',
    )}
  />
);

// Amp
export const IgboAmp = () => (
  <Component isAmp service="igbo" data={igboData.content.groups[0]} />
);
IgboAmp.decorators = [AmpDecorator];

export const PidginAmp = () => (
  <Component isAmp service="pidgin" data={pidginData.content.groups[0]} />
);
PidginAmp.decorators = [AmpDecorator];

export const LinkToMoreAmp = () => (
  <Component
    isAmp
    service="pidgin"
    data={pidginData.content.groups.find(
      sec => pathOr(null, ['strapline', 'type'], sec) === 'LINK',
    )}
  />
);
LinkToMoreAmp.decorators = [AmpDecorator];

export const UsefulLinksAmp = () => (
  <Component
    isAmp
    service="igbo"
    data={russianData.content.groups.find(
      sec => pathOr(null, ['semanticGroupName'], sec) === 'Useful links',
    )}
  />
);
UsefulLinksAmp.decorators = [AmpDecorator];
