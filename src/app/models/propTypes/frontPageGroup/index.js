import { arrayOf, number, shape, string } from 'prop-types';

import { storyItem } from '../storyItem';

const frontPageGroupPropTypes = {
  type: string.isRequired,
  title: string.isRequired,
  maxRelatedLinks: number,
  items: arrayOf(shape(storyItem)).isRequired,
  strapline: shape({
    name: string.isRequired,
  }),
  semanticGroupName: string,
};

export default frontPageGroupPropTypes;
