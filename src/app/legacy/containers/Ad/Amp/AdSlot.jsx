import React from 'react';
import { oneOf, string } from 'prop-types';
import {
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '#psammead/gel-foundations/src/breakpoints';
import isLive from '#lib/utilities/isLive';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';

const publicServiceList = ['news', 'sport'];

const publicServiceDataSlot = () =>
  isLive()
    ? '/4817/bbccom.live.site.amp.news'
    : '/4817/bbccom.test.site.amp.news';

const worldServiceDataSlot = service =>
  isLive()
    ? `/4817/bbcworldservice.live.site.${service}`
    : '/4817/bbccom.test.site.amp.news';

export const getDataSlot = service => {
  const isPublicService = publicServiceList.includes(service);

  if (isPublicService) {
    return publicServiceDataSlot();
  }

  return worldServiceDataSlot(service);
};

const constructAdJsonData = ({ service, slotType, assetType }) => ({
  targeting: {
    slot: slotType,
    asset_type: assetType,
    channel: service,
  },
});

const defaultAmpAdProps = service => ({
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
      media: `(max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX})`,
      'data-multi-size': '320x50,300x50',
    },
    desktop: {
      width: '970',
      height: '250',
      media: `(min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN})`,
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

export const getAssetType = pageType =>
  pageType === STORY_PAGE ? 'story' : 'index';

const AdSlot = ({ service, slotType, pageType }) => {
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

AdSlot.propTypes = {
  service: string.isRequired,
  slotType: oneOf(['leaderboard', 'mpu']).isRequired,
  pageType: string.isRequired,
};

export default AdSlot;
