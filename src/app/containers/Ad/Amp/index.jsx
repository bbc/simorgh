import React from 'react';

const constructAdJsonData = ({ id, service }) => {
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

const ampAdPropsMobile = ({ id, service }) => ({
  media: '(max-width: 599px)',
  type: 'doubleclick',
  width: '320',
  height: '50',
  'data-multi-size': '320x50,300x50',
  'data-slot': '/4817/bbccom.test.site.amp.news',
  'data-amp-slot-index': '0',
  'data-a4a-upgrade-type': 'amp-ad-network-doubleclick-impl',
  json: JSON.stringify(constructAdJsonData({ id, service })),
});

const ampAdPropsDesktop = ({ id, service }) => ({
  media: '(min-width: 600px)',
  type: 'doubleclick',
  width: '970',
  height: '250',
  'data-multi-size': '970x250,728x90',
  'data-slot': '/4817/bbccom.test.site.amp.news',
  'data-amp-slot-index': '0',
  'data-a4a-upgrade-type': 'amp-ad-network-doubleclick-impl',
  json: JSON.stringify(constructAdJsonData({ id, service })),
});

// eslint-disable-next-line react/prop-types
const AmpAd = ({ id, service }) => {
  return (
    <>
      <amp-ad {...ampAdPropsMobile({ id, service })}>
        <amp-img
          placeholder
          width="320"
          height="50"
          src="https://via.placeholder.com/300"
          layout="responsive"
        />
      </amp-ad>

      <amp-ad {...ampAdPropsDesktop({ id, service })}>
        <amp-img
          placeholder
          width="970"
          height="250"
          src="https://via.placeholder.com/300"
          layout="responsive"
        />
      </amp-ad>
    </>
  );
};

export default AmpAd;
