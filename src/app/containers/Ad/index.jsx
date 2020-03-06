import React, { useEffect, useState, useContext } from 'react';
import { RequestContext } from '../../contexts/RequestContext';
import { ServiceContext } from '../../contexts/ServiceContext';
import { Helmet } from 'react-helmet';
import { AMP_JS, AMP_ADS_JS } from '@bbc/psammead-assets/amp-boilerplate';

// import useToggle from '../Toggle/useToggle';

const constructAdJsonData = ({ id, pageType, service }) => {
  const data = {
    targeting: {
      slot: 'leaderboard',
      asset_type: 'index',
      story_id: id,
      channel: service,
      sectn: service,
      subject: '',
    },
  };

  return data;
};

const ampAdProps = ({ id, pageType, service }) => ({
  type: 'doubleclick',
  width: '970',
  height: '250',
  'data-aax_size': ['320x250', '970x250'],
  'data-slot': '/4817/bbccom.test.site.amp.news',
  'data-amp-slot-index': '0',
  'data-a4a-upgrade-type': 'amp-ad-network-doubleclick-impl',
  json: JSON.stringify(constructAdJsonData({ id, pageType, service })),
});

const AdContainer = () => {
  const { id, pageType } = useContext(RequestContext);
  const { service } = useContext(ServiceContext);
  //   const { enabled } = useToggle('ampAds');
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    setShowAd(true);
  }, []);

  return (
    showAd && (
      <>
        <Helmet>
          {AMP_JS}
          {AMP_ADS_JS}
        </Helmet>

        <amp-ad {...ampAdProps({ id, pageType, service })}>
          <amp-img
            placeholder
            height="250"
            width="970"
            src="https://via.placeholder.com/300"
            layout="responsive"
          />
        </amp-ad>
      </>
    )
  );
};

export default AdContainer;
