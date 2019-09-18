import React, { useContext } from 'react';
import { string } from 'prop-types';
import {
  CanonicalMediaPlayer,
  AmpMediaPlayer,
} from '@bbc/psammead-media-player';
import { RequestContext } from '#contexts/RequestContext';

const LiveRadioContainer = ({ idAttr, externalId, id }) => {
  const { platform } = useContext(RequestContext);

  const MediaPlayer = {
    canonical: CanonicalMediaPlayer,
    amp: AmpMediaPlayer,
  }[platform];

  if (!MediaPlayer || !externalId || !id) return null;

  return (
    <MediaPlayer
      showPlaceholder={false}
      src={`/ws/av-embeds/media/${externalId}/${id}`}
      id={idAttr}
      skin="audio"
    />
  );
};

LiveRadioContainer.propTypes = {
  idAttr: string,
  externalId: string.isRequired,
  id: string.isRequired,
};

LiveRadioContainer.defaultProps = {
  idAttr: null,
};

export default LiveRadioContainer;
