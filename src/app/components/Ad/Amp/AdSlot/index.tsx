import React from 'react';
import isLive from '#lib/utilities/isLive';
import { STORY_PAGE } from '../../../../routes/utils/pageTypes';
import { PageTypes, Services } from '../../../../models/types/global';
import { SlotType } from '../../types';
import {
  GROUP_3_MAX_WIDTH_BP,
  GROUP_4_MIN_WIDTH_BP,
} from '../../../ThemeProvider/mediaQueries';

const publicServiceList = ['news', 'sport', 'ws'];

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

interface AdJsonDataProps {
  service: Services;
  slotType: SlotType;
  assetType: string;
}

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

type Device = 'mobile' | 'desktop';

interface DeviceSettings {
  width: string;
  height: string;
  media?: string;
  'data-multi-size': string;
}

const slotConfigurations: {
  [_slot in SlotType]: {
    [_device in Device]?: DeviceSettings;
  };
} = {
  leaderboard: {
    mobile: {
      width: '320',
      height: '50',
      media: `(max-width: ${GROUP_3_MAX_WIDTH_BP}rem)`,
      'data-multi-size': '320x50,300x50',
    },
    desktop: {
      width: '970',
      height: '250',
      media: `(min-width: ${GROUP_4_MIN_WIDTH_BP}rem)`,
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

interface AdSlotProps {
  service: Services;
  slotType: SlotType;
  pageType: PageTypes;
}

const AdSlot = ({ service, slotType, pageType }: AdSlotProps) => {
  const { mobile, desktop } = slotConfigurations[slotType];
  const assetType = getAssetType(pageType);
  const targetingJson = JSON.stringify(
    constructAdJsonData({ service, slotType, assetType }),
  );

  return (
    <>
      {mobile && (
        <amp-ad
          {...defaultAmpAdProps(service)}
          {...mobile}
          json={targetingJson}
        />
      )}
      {desktop && (
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
