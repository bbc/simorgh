import { number, string } from 'prop-types';
import {
  blockOfValidTypeAndModel,
  blockObjectOfValidTypeAndModel,
  blocksWithTypes,
  arrayOfSpecificBlocks,
} from '../general';
import { textBlockPropTypes } from '../text';

const rawImageBlockPropTypes = blockObjectOfValidTypeAndModel(['rawImage'], {
  width: number.isRequired,
  height: number.isRequired,
  locator: string.isRequired,
  copyrightHolder: string,
});

const altTextBlockPropTypes = blockObjectOfValidTypeAndModel(
  ['altText'],
  blocksWithTypes([textBlockPropTypes]),
);

const captionBlockPropTypes = blockObjectOfValidTypeAndModel(
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

export const imageBlockPropTypes = blockOfValidTypeAndModel(
  ['image'],
  imageModelPropTypes,
);
