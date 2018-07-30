import { number, string } from 'prop-types';
import {
  blockOfSpecificTypeAndModel,
  blockObjectOfSpecificTypeAndModel,
  blocksWithTypes,
  arrayOfSpecificObjects,
} from '../general';
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

const blockProps = {
  rawImage: rawImageBlockPropTypes,
  altText: altTextBlockPropTypes,
  caption: captionBlockPropTypes,
};

const requiredPropCheck = ({ find }) => {
  const rawImage = find(({ type }) => type === 'rawImage');

  if (!rawImage) {
    return new Error(`Missing required prop: rawImage`);
  }

  const altText = find(({ type }) => type === 'altText');

  if (!altText) {
    return new Error(`Missing required prop: altText`);
  }

  return null;
};

export const imageModelPropTypes = {
  blocks: arrayOfSpecificObjects(requiredPropCheck, blockProps),
};
