import { oneOf } from 'prop-types';
import { variants } from '#lib/utilities/variantHandler';

const variantPropType = oneOf(variants);

export default variantPropType;
