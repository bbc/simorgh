import React from 'react';
import { oneOf, string } from 'prop-types';
import {
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '@bbc/gel-foundations/breakpoints';

const constructAdJsonData = ({ service, slotType }) => ({
  targeting: {
    slot: slotType,
    asset_type: 'index',
    channel: service,
  },
});

const defaultAmpAdProps = {
  'data-block-on-consent': 'default',
  'data-npa-on-unknown-consent': 'true',
  type: 'doubleclick',
  'data-slot': '/4817/bbccom.test.site.amp.news',
  'data-amp-slot-index': '0',
  'data-a4a-upgrade-type': 'amp-ad-network-doubleclick-impl',
};

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

const AdSlot = ({ service, slotType }) => {
  const { mobile, desktop } = slotConfigurations[slotType];
  const targetingJson = JSON.stringify(
    constructAdJsonData({ service, slotType }),
  );

  return (
    <>
      {mobile && (
        <amp-ad {...defaultAmpAdProps} {...mobile} json={targetingJson} />
      )}
      {desktop && (
        <amp-ad {...defaultAmpAdProps} {...desktop} json={targetingJson} />
      )}
    </>
  );
};

AdSlot.propTypes = {
  service: string.isRequired,
  slotType: oneOf(['leaderboard', 'mpu']).isRequired,
};

export default AdSlot;
