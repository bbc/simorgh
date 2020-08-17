import { oneOf } from 'prop-types';

const variantPropType = oneOf([
  'simp',
  'trad',
  'lat',
  'cyr',
  'default',
  'ru-UA',
]);

export default variantPropType;
