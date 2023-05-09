/* eslint-disable react/prop-types */
import React, { PropsWithChildren } from 'react';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { TEXT_VARIANTS } from '#psammead/psammead-storybook-helpers/src';
import Timestamp from '#psammead/psammead-timestamp/src';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import latin from '../../ThemeProvider/fontScripts/latin';
import { MostReadItemWrapper, MostReadLink } from '../Canonical/Item';
import MostReadRank from '../Canonical/Rank';
import { Services } from '../../../models/types/global';
import { TypographyScript } from '../../../models/types/theming';
import { MostReadBaseProps, Size } from '../types';

const lastUpdated = ({
  script,
  service,
}: {
  script: TypographyScript;
  service: Services;
}) => (
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

const WithContexts = ({ children }: PropsWithChildren) => (
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

export const getItem = ({
  service,
  withTimestamp = false,
}: {
  service: Services;
  withTimestamp: boolean;
}) => {
  const baseUrl = 'https://www.bbc.com';
  // @ts-expect-error Not planning to add text variant objects for non-used services
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

interface GetItemWrapperArrayProps extends MostReadBaseProps {
  withTimestamp?: boolean;
  listIndex?: number;
  service: Services;
  script: TypographyScript;
  size?: Size;
  isAmp?: boolean;
}

export const getItemWrapperArray = ({
  numberOfItems,
  service,
  script,
  dir,
  withTimestamp = false,
  columnLayout,
  size,
  isAmp = false,
}: GetItemWrapperArrayProps) => {
  const itemWrapperArray = [];
  const item = getItem({ service, withTimestamp });
  for (let i = 1; i <= numberOfItems; i += 1) {
    itemWrapperArray.push(
      // @ts-expect-error will review and fix this
      <MostReadItemWrapper dir={dir} key={i} columnLayout={columnLayout}>
        <MostReadRank
          service={service}
          script={script}
          listIndex={i}
          numberOfItems={numberOfItems}
          dir={dir}
          columnLayout={columnLayout}
          size={size}
          isAmp={isAmp}
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
