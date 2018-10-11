import React from 'react';
import { arrayOf } from 'prop-types';
import nanoid from 'nanoid';
import { textBlockNewPropTypes } from '../../models/propTypes/textnew';
import textNew from '../TextNew';
import Blocks from '../Blocks';

const componentsToRender = { textNew };

// Todo - update Article container to use this instead of the Text container
const Texts = ({ blocks }) => {
  if (!blocks) {
    return null;
  }

  // Todo - fix this render
  return (
    <Blocks
      key={nanoid()}
      blocks={blocks}
      componentsToRender={componentsToRender}
    />
  );
};

Texts.propTypes = {
  blocks: arrayOf(textBlockNewPropTypes).isRequired,
};

export default Texts;
