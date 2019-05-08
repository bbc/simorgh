import React from 'react';
import Helmet from 'react-helmet';
import { videoComponentPropTypes } from '../../models/propTypes';

const Video = ({
  videoLocator,
  duration,
  rawImageSrc,
  versionID,
  imageLocator,
  kind,
  metadata,
}) => {
  const HTMLContent = (
    <div>
      <div>
        video locator:
        {videoLocator}
      </div>
      <div>
        duration:
        {duration}
      </div>
      <div>
        raw Image Src:
        {rawImageSrc}
      </div>
      <div>
        versionID:
        {versionID}
      </div>
      <div>
        imageLocator:
        {imageLocator}
      </div>
      <div>
        kind:
        {kind}
      </div>
    </div>
  );

  return (
    <Helmet>
      {<script type="application/ld+json">{JSON.stringify(metadata)}</script>}
    </Helmet>,
    HTMLContent
  );
};

Video.propTypes = videoComponentPropTypes;

Video.defaultProps = {
  duration: 299,
  imageLocator: '/cpsprodpb/5BD5/production/_101690532_2.jpg',
  kind: 'clip',
  rawImageSrc: 'raw image source',
  versionID: 'p064nsz3',
  videoLocator: 'urn:bbc:pips:pid:p064nsyw',
  metadata: {
    video: {
      '@list': [
        {
          '@type': 'VideoObject',
          description: 'Default video description',
          duration: 299,
          name: 'Default vido name',
          thumbnailUrl: 'https:///cpsprodpb/5BD5/production/_101690532_2.jpg',
          uploadDate: '2018-09-05T14:35:42+01:00',
        },
      ],
    },
  },
};

export default Video;
