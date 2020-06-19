import React from 'react';
import { oneOf, string } from 'prop-types';
import {
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '@bbc/gel-foundations/breakpoints';

const constructAdJsonData = ({ service }) => ({
  targeting: {
    slot: 'leaderboard',
    asset_type: 'index',
    channel: service,
  },
});

const slotConfigurations = {
  leaderboard: {
    mobile: {
      width: '320',
      height: '50',
      media: `(max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX})`,
      adMultiSize: '320x50,300x50',
    },
    desktop: {
      width: '970',
      height: '250',
      media: `(min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN})`,
      adMultiSize: '970x250,728x90',
    },
  },
  mpu: {
    mobile: {
      width: '300',
      height: '250',
      adMultiSize: '300x250',
    },
    desktop: {
      width: '300',
      height: '250',
      adMultiSize: '300x250',
    },
  },
};

const AdSlot = ({ viewportType, service, slotType }) => {
  const {
    [viewportType]: { width, height, media, adMultiSize },
  } = slotConfigurations[slotType];
  return (
    <amp-ad
      data-block-on-consent="default"
      data-npa-on-unknown-consent="true"
      media={media}
      type="doubleclick"
      width={width}
      height={height}
      data-multi-size={adMultiSize}
      data-slot="/4817/bbccom.test.site.amp.news"
      data-amp-slot-index="0"
      data-a4a-upgrade-type="amp-ad-network-doubleclick-impl"
      json={JSON.stringify(constructAdJsonData({ service }))}
    />
  );
};

AdSlot.propTypes = {
  viewportType: oneOf(['mobile', 'desktop']).isRequired,
  service: string.isRequired,
  slotType: oneOf(['leaderboard', 'mpu']).isRequired,
};

export default AdSlot;
