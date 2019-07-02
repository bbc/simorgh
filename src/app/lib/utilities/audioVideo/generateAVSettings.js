import mediaPlayerSettings from './mediaPlayerSettings';
import deepGet from '../deepGet';
import filterForBlockType from '../blockHandlers';

const generateAVSettings = ({
  blocks,
  env,
  statsDestination,
  statsPageIdentifier,
}) => {
  const audioVideoBlocks = blocks.filter(
    block => block.type === 'audio' || block.type === 'video',
  );

  return audioVideoBlocks.map(avBlock => {
    // The following lines are just to fetch the pid
    // that is needed for ids on the media player placeholder divs
    // and aresMediaBlocksArray to generate the mediaPlayerSettings
    // object which needs to be passed to AudioVideoHead
    const toplevelblock = deepGet(['model', 'blocks'], avBlock);
    const aresMediaBlock = filterForBlockType(toplevelblock, 'aresMedia');
    const aresMediaBlocksArray = deepGet(['model', 'blocks'], aresMediaBlock);
    const aresMediaMetadata = filterForBlockType(
      aresMediaBlocksArray,
      'aresMediaMetadata',
    );
    const pid = deepGet(['model', 'id'], aresMediaMetadata);

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
