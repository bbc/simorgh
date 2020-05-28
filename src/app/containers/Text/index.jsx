import React from 'react';
import paragraph from '../Paragraph';
import bulletedList from '../BulletedList';
import Blocks from '../Blocks';
import { textModelPropTypes } from '#models/propTypes/text';

const componentsToRender = { paragraph, unorderedList: bulletedList };

const TextContainer = ({ blocks }) => {
  if (!blocks) return null;

  return (
    <>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </>
  );
};

TextContainer.propTypes = {
  ...textModelPropTypes,
};

export default TextContainer;
