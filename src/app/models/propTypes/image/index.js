import { number, string } from 'prop-types';
import {
  blockOfTypesAndModel,
  blockObjectOfTypesAndModel,
  blocksWithTypes,
  arrayOfSpecificBlocks,
} from '../general';
import { textBlockPropTypes } from '../text';

const rawImageBlockPropTypes = blockObjectOfTypesAndModel(['rawImage'], {
  width: number.isRequired,
  height: number.isRequired,
  locator: string.isRequired,
  copyrightHolder: string,
});

const altTextBlockPropTypes = blockObjectOfTypesAndModel(
  ['altText'],
  blocksWithTypes([textBlockPropTypes]),
);

const captionBlockPropTypes = blockObjectOfTypesAndModel(
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

export const imageBlockPropTypes = blockOfTypesAndModel(
  ['image'],
  imageModelPropTypes,
);
