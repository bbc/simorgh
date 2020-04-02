import React from 'react';
import path from 'ramda/src/path';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { textDefaultPropTypes } from '#models/propTypes';
import { headlineModelPropTypes } from '#models/propTypes/headline';

const VisuallyHiddenHeadline = (props) => (
  <VisuallyHiddenText as="h1" {...props} />
);

const VisuallyHiddenHeadlineContainer = ({ blocks }) => {
  const { text } = path(['0', 'model', 'blocks', '0', 'model'], blocks);

  if (!text) {
    return null;
  }

  const id = 'content'; // Used for the skiplink

  return (
    <VisuallyHiddenHeadline id={id} tabIndex="-1">
      {text}
    </VisuallyHiddenHeadline>
  );
};

VisuallyHiddenHeadlineContainer.propTypes = {
  ...headlineModelPropTypes,
};

VisuallyHiddenHeadlineContainer.defaultProps = textDefaultPropTypes;

export default VisuallyHiddenHeadlineContainer;
