import React from 'react';
import AudioVideo from '../../components/AudioVideo';
import deepGet from '../../lib/utilities/deepGet';
import { audioVideoPropTypes } from '../../models/propTypes';
import filterForBlockType from '../../lib/utilities/blockHandlers';
import mediaPlayerSettings from './mediaPlayerSettings';
import { RequestContext } from '../../contexts/RequestContext';

const Canonical = ({ blocks }) => {
  const { env, statsDestination, statsPageIdentifier } = React.useContext(
    RequestContext,
  );

  if (!blocks) {
    return null;
  }

  const aresMediaBlock = filterForBlockType(blocks, 'aresMedia');

  if (!aresMediaBlock) {
    return null;
  }
  const pid = deepGet(['model', 'blocks', 0, 'model', 'id'], aresMediaBlock);
  const id = `mp#${pid}`;

  return (
    <AudioVideo
      idArray={['mediaPlayer1', 'mediaPlayer2', 'mediaPlayer3']}
      id={id}
      mediaPlayerSettings={mediaPlayerSettings({
        aresMediaBlock,
        env,
        pid,
        statsDestination,
        statsPageIdentifier,
      })}
      width="100%"
      height="26em"
    />
  );
};

Canonical.propTypes = {
  ...audioVideoPropTypes,
};

export default Canonical;
