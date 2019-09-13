import React, { useContext } from 'react';
import {
  CanonicalMediaPlayer,
  AmpMediaPlayer,
} from '@bbc/psammead-media-player';
import { RequestContext } from '../../../contexts/RequestContext';

// eslint-disable-next-line react/prop-types
const HeadingContainer = ({ uuid, idAttr, externalId, id }) => {
  const { platform } = useContext(RequestContext);

  const MediaPlayer = {
    canonical: CanonicalMediaPlayer,
    amp: AmpMediaPlayer,
  }[platform];

  return (
    <MediaPlayer
      key={uuid}
      showPlaceholder={false}
      src={`/ws/av-embeds/media/${externalId}/${id}`}
      id={idAttr}
    />
  );
};

export default HeadingContainer;
