import React, { useContext } from 'react';
import { RequestContext } from '../../contexts/RequestContext';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import useToggle from '../Toggle/useToggle';

const constructAdJsonData = ({ id, pageType }) => {
  const data = {
    targeting: {
      slot: 'mpu',
      asset_type: pageType,
      story_id: id,
      channel: 'news',
      sectn: 'news',
      subject: '',
    },
  };

  return data.toString();
};

const AdContainer = () => {
  const { id, platform, pageType } = useContext(RequestContext);
  const { enabled } = useToggle('ampAds');

  if (enabled && (platform === 'amp' || platform === 'canonical')) {
    return (
      <GridItemConstrainedMedium>
        <amp-ad
          type="doubleclick"
          width="300"
          height="250"
          data-slot="/4817/bbccom.live.site.amp.news"
          data-amp-slot-index="0"
          data-a4a-upgrade-type="amp-ad-network-doubleclick-impl"
          json={constructAdJsonData({ id, pageType })}
        >
          <amp-img
            placeholder
            height="300"
            width="300"
            src="https://via.placeholder.com/300"
            layout="responsive"
          />
        </amp-ad>
      </GridItemConstrainedMedium>
    );
  }

  return null;
};

export default AdContainer;
