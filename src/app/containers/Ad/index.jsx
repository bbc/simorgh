import React, { useContext } from 'react';
import { RequestContext } from '../../contexts/RequestContext';
import { ServiceContext } from '../../contexts/ServiceContext';
import { GridItemConstrainedLargeWithAutoMargin } from '#lib/styledGrid';
import useToggle from '../Toggle/useToggle';

const constructAdJsonData = ({ id, pageType, service }) => {
  const data = {
    targeting: {
      slot: 'mpu',
      asset_type: pageType,
      story_id: id,
      channel: service,
      sectn: service,
      subject: '',
    },
  };

  return data.toString();
};

const ampAdProps = ({ id, pageType, service }) => ({
  type: 'doubleclick',
  width: '300',
  height: '250',
  'data-slot': '/4817/bbccom.live.site.amp.news',
  'data-amp-slot-index': '0',
  'data-a4a-upgrade-type': 'amp-ad-network-doubleclick-impl',
  json: constructAdJsonData({ id, pageType, service }),
});

const AdContainer = () => {
  const { id, pageType } = useContext(RequestContext);
  const { service } = useContext(ServiceContext);
  const { enabled } = useToggle('ampAds');

  if (enabled) {
    return (
      <GridItemConstrainedLargeWithAutoMargin>
        <amp-ad {...ampAdProps({ id, pageType, service })}>
          <amp-img
            placeholder
            height="300"
            width="300"
            src="https://via.placeholder.com/300"
            layout="responsive"
          />
        </amp-ad>
      </GridItemConstrainedLargeWithAutoMargin>
    );
  }

  return null;
};

export default AdContainer;
