import { number, string } from 'prop-types';
import { blockObjectOfSpecificTypeAndModel, blocksWithTypes } from '../general';
import { textBlockPropTypes } from '../text';

const rawImageBlockPropTypes = blockObjectOfSpecificTypeAndModel('rawImage', {
  width: number.isRequired,
  height: number.isRequired,
  locator: string.isRequired,
  copyrightHolder: string.isRequired,
});

const altTextBlockPropTypes = blockObjectOfSpecificTypeAndModel(
  'altText',
  blocksWithTypes([textBlockPropTypes]),
);

const captionBlockPropTypes = blockObjectOfSpecificTypeAndModel(
  'caption',
  blocksWithTypes([textBlockPropTypes]),
);
