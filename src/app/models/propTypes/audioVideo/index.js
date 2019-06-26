import { arrayOf, string, bool, shape } from 'prop-types';
import { textBlockPropTypes } from '../text';
import { imageBlockPropTypes } from '../image';

const audioVideoBlockPropTypes = {
  blocks: arrayOf(
    shape({
      locator: string,
      blocks: arrayOf(
        // raw video
        shape({
          model: shape({
            isLive: bool,
            duration: string,
            locator: string.isRequired,
          }),
        }),
        // alt text
        shape(textBlockPropTypes),
        // image
        shape(imageBlockPropTypes),
      ),
    }),
  ).isRequired,
};

export default audioVideoBlockPropTypes;
