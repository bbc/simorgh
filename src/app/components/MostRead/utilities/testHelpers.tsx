import React, { PropsWithChildren } from 'react';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import TEXT_VARIANTS from '#storybook/withServicesDecorator/text-variants';
import Timestamp from '#legacy/psammead/psammead-timestamp/src';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import latin from '../../ThemeProvider/fontScripts/latin';
import { MostReadItemWrapper, MostReadLink } from '../Canonical/Item';
import MostReadRank from '../Canonical/Rank';
import { Services, Direction } from '#models/types/global';
import { TypographyScript } from '#models/types/theming';
import { MostReadBaseProps, MostReadData, Size } from '../types';

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
  withTimestamp?: boolean;
}) => {
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

interface GetItemWrapperArrayProps extends MostReadBaseProps {
  dir?: Direction;
  withTimestamp?: boolean;
  listIndex?: number;
  service: Services;
  size: Size;
  isAmp?: boolean;
}

export const getItemWrapperArray = ({
  numberOfItems,
  service,
  dir = 'ltr',
  withTimestamp = false,
  columnLayout = 'multiColumn',
  size,
  isAmp = false,
}: GetItemWrapperArrayProps) => {
  const itemWrapperArray = [];
  const item = getItem({ service, withTimestamp });
  for (let i = 1; i <= numberOfItems; i += 1) {
    itemWrapperArray.push(
      <MostReadItemWrapper dir={dir} key={i} columnLayout={columnLayout}>
        <MostReadRank
          service={service}
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

export const setStalePromoTimestamp = (mostReadData: MostReadData) => {
  const oldTimestamp = 864691200; // 27/05/1997
  const updatedMostReadData = { ...mostReadData };

  // set first promo to have an old timestamp
  if (updatedMostReadData.items[0]) {
    updatedMostReadData.items[0].timestamp = oldTimestamp;
  }

  return updatedMostReadData;
};

export const setFreshPromoTimestamp = (mostReadData: MostReadData) => {
  const freshDate = new Date();
  const updatedMostReadData = { ...mostReadData };
  const { items } = updatedMostReadData;

  // Updates first 10 promos to have a fresh date
  for (let i = 0; i < 10; i += 1) {
    items[i].timestamp = freshDate.getTime();
  }

  return updatedMostReadData;
};

export const setStaleLastRecordTimeStamp = (mostReadData: MostReadData) => {
  const updatedMostReadData = { ...mostReadData };
  updatedMostReadData.lastRecordTimeStamp = '2019-11-06T16:28:00Z';

  return updatedMostReadData;
};
