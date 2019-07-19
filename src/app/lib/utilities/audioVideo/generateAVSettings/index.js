import pathOr from 'ramda/src/pathOr';
import mediaPlayerSettings from '../mediaPlayerSettings';
import filterForBlockType from '../../blockHandlers';

const generateAVSettings = ({
  audioVideoBlocks,
  env,
  statsDestination,
  statsPageIdentifier,
}) => {
  return audioVideoBlocks.map(avBlock => {
    // The following lines are just to fetch the pid
    // that is needed for ids on the media player placeholder divs
    // and aresMediaBlocksArray to generate the mediaPlayerSettings
    // object which needs to be passed to AudioVideoHead
    const toplevelblock = pathOr(null, ['model', 'blocks'], avBlock);
    const aresMediaBlock = filterForBlockType(toplevelblock, 'aresMedia');
    const aresMediaBlocksArray = pathOr(
      null,
      ['model', 'blocks'],
      aresMediaBlock,
    );
    const aresMediaMetadata = filterForBlockType(
      aresMediaBlocksArray,
      'aresMediaMetadata',
    );
    const pid = pathOr(null, ['model', 'id'], aresMediaMetadata);

    return {
      id: pid,
      mediaPlayerSettings: mediaPlayerSettings({
        aresMediaBlocks: aresMediaBlocksArray,
        env,
        statsDestination,
        statsPageIdentifier,
      }),
    };
  });
};

export default generateAVSettings;
