import React from 'react';
import path from 'ramda/src/path';
import VisuallyHiddenText from '../../../components/VisuallyHiddenText';

const VisuallyHiddenHeadline = props => (
  <VisuallyHiddenText as="h1" {...props} />
);

const VisuallyHiddenHeadlineContainer = ({
  blocks = [
    {
      model: {
        blocks: [
          {
            model: {},
          },
        ],
      },
    },
  ],
}) => {
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

export default VisuallyHiddenHeadlineContainer;
