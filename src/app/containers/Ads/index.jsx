import React from 'react';

const AdContainer = () => {
  return (
    <amp-ad
      type="doubleclick"
      width="300"
      height="250"
      data-slot="/4817/bbccom.live.site.amp.news"
      data-amp-slot-index="0"
      data-a4a-upgrade-type="amp-ad-network-doubleclick-impl"
      json='{"targeting":{"slot":"mpu","asset_type":"story","story_id":"49247129","channel":"sport","sectn":"cricket","subsect":""}}'
    >
      <amp-img
        placeholder
        height="300"
        width="300"
        src="https://via.placeholder.com/300"
        layout="responsive"
      ></amp-img>
    </amp-ad>
  );
};

export default AdContainer;
