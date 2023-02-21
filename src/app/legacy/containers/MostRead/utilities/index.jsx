/* eslint-disable react/prop-types */
import React from 'react';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { TEXT_VARIANTS } from '#psammead/psammead-storybook-helpers/src';
import Timestamp from '#psammead/psammead-timestamp/src';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import { MostReadItemWrapper, MostReadLink } from '../Canonical/Item';
import MostReadRank from '../Canonical/Rank';

const lastUpdated = ({ script, service }) => (
  // This will return the provided english translations
  <Timestamp
    datetime="2019-03-01T14:00+00:00"
    script={script}
    padding={false}
    service={service}
  >
    Last updated: 5th November 2016
  </Timestamp>
);

const WithContexts = ({ children }) => (
  <ServiceContextProvider service="pidgin">
    <ToggleContextProvider
      toggles={{
        eventTracking: { enabled: true },
      }}
    >
      {children}
    </ToggleContextProvider>
  </ServiceContextProvider>
);

export const getItem = ({ service, withTimestamp = false }) => {
  const baseUrl = 'https://www.bbc.com';
  const { text, articlePath } = TEXT_VARIANTS[service];
  const timestamp = withTimestamp
    ? lastUpdated({ script: latin, service })
    : null;

  return {
    id: `${Math.floor(Math.random() * 100000) + 1}`,
    title: text,
    href: `${baseUrl}${articlePath}`,
    timestamp,
  };
};

export const getItemWrapperArray = ({
  numberOfItems,
  service,
  script,
  dir,
  withTimestamp = false,
  columnLayout,
  size,
}) => {
  const itemWrapperArray = [];
  const item = getItem({ service, withTimestamp });
  for (let i = 1; i <= numberOfItems; i += 1) {
    itemWrapperArray.push(
      <MostReadItemWrapper dir={dir} key={i} columnLayout={columnLayout}>
        <MostReadRank
          service={service}
          script={script}
          listIndex={i}
          numberOfItems={numberOfItems}
          dir={dir}
          columnLayout={columnLayout}
          size={size}
        />
        <MostReadLink
          dir={dir}
          href={item.href}
          service={service}
          script={script}
          title={item.title}
          size={size}
        >
          {item.timestamp}
        </MostReadLink>
      </MostReadItemWrapper>,
    );
  }
  return <WithContexts>{itemWrapperArray}</WithContexts>;
};
