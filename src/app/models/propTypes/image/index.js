import { number, string } from 'prop-types';
import {
  blockOfSpecificTypeAndModel,
  blockObjectOfSpecificTypeAndModel,
  blocksWithTypes,
  arrayOfSpecificBlocks,
} from '../general';
import { textBlockPropTypes } from '../text';

const rawImageBlockPropTypes = blockObjectOfSpecificTypeAndModel(['rawImage'], {
  width: number.isRequired,
  height: number.isRequired,
  locator: string.isRequired,
  copyrightHolder: string,
});

const altTextBlockPropTypes = blockObjectOfSpecificTypeAndModel(
  ['altText'],
  blocksWithTypes([textBlockPropTypes]),
);

const captionBlockPropTypes = blockObjectOfSpecificTypeAndModel(
  ['caption'],
  blocksWithTypes([textBlockPropTypes]),
);

const blockProps = [
  {
    type: 'rawImage',
    props: rawImageBlockPropTypes,
    isRequired: true,
  },
  {
    type: 'altText',
    props: altTextBlockPropTypes,
    isRequired: true,
  },
  {
    type: 'caption',
    props: captionBlockPropTypes,
    isRequired: false,
  },
];

export const imageModelPropTypes = {
  blocks: arrayOfSpecificBlocks(blockProps),
};

export const imageBlockPropTypes = blockOfSpecificTypeAndModel(
  ['image'],
  imageModelPropTypes,
);
