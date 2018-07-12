import { string } from 'prop-types';
import { blockOfSpecificTypeAndModel, blocksWithTypes } from '../general';

const paragraphBlock = blockOfSpecificTypeAndModel('paragraph', {
  text: string.isRequired,
});

export const textModelPropTypes = blocksWithTypes([paragraphBlock.isRequired]);

export const textModelDefaultProps = {
  blocks: [],
};

export const textBlockPropTypes = blockOfSpecificTypeAndModel(
  'text',
  textModelPropTypes,
);

export const optionalTextBlockPropTypes = blockOfSpecificTypeAndModel(
  'text',
  blocksWithTypes([paragraphBlock]),
);
// {
//   blocks: arrayOf(
//     shape({
//       model: shape({
//         blocks: arrayOf(
//           shape({
//             model: shape({
//               text: string,
//             }),
//           }),
//         ),
//       }),
//     }),
//   ),
// }
