import React, { PropsWithChildren } from 'react';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { TEXT_VARIANTS } from '../../../legacy/psammead/psammead-storybook-helpers/src';
import Timestamp from '../../../legacy/psammead/psammead-timestamp/src';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import latin from '../../ThemeProvider/fontScripts/latin';
import { MostReadItemWrapper, MostReadLink } from '../Canonical/Item';
import MostReadRank from '../Canonical/Rank';
import { Services } from '../../../models/types/global';
import { TypographyScript } from '../../../models/types/theming';
import { Direction, MostReadBaseProps, MostReadData, Size } from '../types';

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
  // @ts-expect-error Text variants not required for non world service languages
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
  if (updatedMostReadData.records[0].promo) {
    updatedMostReadData.records[0].promo.timestamp = oldTimestamp;
  }

  return updatedMostReadData;
};

export const setFreshPromoTimestamp = (mostReadData: MostReadData) => {
  const freshDate = new Date();
  const updatedMostReadData = { ...mostReadData };
  const { records } = updatedMostReadData;

  // Updates first 10 promos to have a fresh date
  for (let i = 0; i < 10; i += 1) {
    if (records[i] && records[i].promo) {
      records[i].promo.timestamp = freshDate.getTime();
    }
  }

  return updatedMostReadData;
};

export const setStaleLastRecordTimeStamp = (mostReadData: MostReadData) => {
  const updatedMostReadData = { ...mostReadData };
  updatedMostReadData.lastRecordTimeStamp = '2019-11-06T16:28:00Z';

  return updatedMostReadData;
};
