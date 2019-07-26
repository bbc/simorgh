import { arrayOf, string, bool, shape } from 'prop-types';
import { textBlockPropTypes } from '../text';
import { imageBlockPropTypes } from '../image';

const mediaPlayerBlockPropTypes = shape({
  locator: string,
  blocks: arrayOf(
    shape({
      model: shape({
        isLive: bool,
        duration: string,
        locator: string.isRequired,
      }),
    }),
    shape(textBlockPropTypes),
    shape(imageBlockPropTypes),
  ),
});

export default mediaPlayerBlockPropTypes;
