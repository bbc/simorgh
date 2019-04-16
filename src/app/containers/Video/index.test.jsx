import React from 'react';
import { isNull } from '../../helpers/tests/testHelpers';
import {
  blockArrayModel,
  rawVideoModel,
  rawVideoBlock,
  imageBlock,
} from '../../models/blocks';
import VideoContainer from './index';

describe('Video', () => {
  const rVB = rawVideoBlock(
    rawVideoModel('urn:bbc:pips:pid:p064nsyw', 'p064nsz3', 'clip', '299'),
  );

  describe('with data but no raw image', () => {
    const rIB = null;
    const img = imageBlock(rIB);
    const data = blockArrayModel([rVB, img]);

    isNull('should be null', <VideoContainer {...data} />);
  });
});
