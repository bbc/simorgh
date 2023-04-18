/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import isLive from '#lib/utilities/isLive';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import { PageTypes, Services } from '#app/models/types/global';
import { AdJsonDataProps, AmpAdSlotProps } from '../../types';
import {
  GROUP_3_MAX_WIDTH,
  GROUP_4_MIN_WIDTH,
} from '../../../ThemeProvider/mediaQueries';

const publicServiceList = ['news', 'sport'];

const publicServiceDataSlot = () =>
  isLive()
    ? '/4817/bbccom.live.site.amp.news'
    : '/4817/bbccom.test.site.amp.news';

const worldServiceDataSlot = (service: Services) =>
  isLive()
    ? `/4817/bbcworldservice.live.site.${service}`
    : '/4817/bbccom.test.site.amp.news';

export const getDataSlot = (service: Services) => {
  const isPublicService = publicServiceList.includes(service);

  if (isPublicService) {
    return publicServiceDataSlot();
  }

  return worldServiceDataSlot(service);
};

const constructAdJsonData = ({
  service,
  slotType,
  assetType,
}: AdJsonDataProps) => ({
  targeting: {
    slot: slotType,
    asset_type: assetType,
    channel: service,
  },
});

const defaultAmpAdProps = (service: Services) => ({
  'data-block-on-consent': 'default',
  'data-npa-on-unknown-consent': 'true',
  type: 'doubleclick',
  'data-slot': getDataSlot(service),
  'data-amp-slot-index': '0',
  'data-a4a-upgrade-type': 'amp-ad-network-doubleclick-impl',
  'data-multi-size-validation': 'false',
});

const slotConfigurations = {
  leaderboard: {
    mobile: {
      width: '320',
      height: '50',
      media: GROUP_3_MAX_WIDTH,
      'data-multi-size': '320x50,300x50',
    },
    desktop: {
      width: '970',
      height: '250',
      media: GROUP_4_MIN_WIDTH,
      'data-multi-size': '970x250,728x90',
    },
  },
  mpu: {
    mobile: {
      width: '300',
      height: '250',
      'data-multi-size': '300x250',
    },
  },
};

export const getAssetType = (pageType: PageTypes) =>
  pageType === STORY_PAGE ? 'story' : 'index';

const AdSlot = ({ service, slotType, pageType }: AmpAdSlotProps) => {
  // @ts-expect-error
  const { mobile, desktop } = slotConfigurations[slotType];
  const assetType = getAssetType(pageType);
  const targetingJson = JSON.stringify(
    constructAdJsonData({ service, slotType, assetType }),
  );

  return (
    <>
      {mobile && (
        // @ts-ignore Property 'amp-ad' does not exist on type 'JSX.IntrinsicElements'.ts(2339)
        <amp-ad
          {...defaultAmpAdProps(service)}
          {...mobile}
          json={targetingJson}
        />
      )}
      {desktop && (
        // @ts-ignore Property 'amp-ad' does not exist on type 'JSX.IntrinsicElements'.ts(2339)
        <amp-ad
          {...defaultAmpAdProps(service)}
          {...desktop}
          json={targetingJson}
        />
      )}
    </>
  );
};

export default AdSlot;
