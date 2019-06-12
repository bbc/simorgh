import React from 'react';
import { shouldShallowMatchSnapshot, isNull } from '../../../testHelpers';
import TextContainer from './index';

describe('TextContainer', () => {
  describe('with no data', () => {
    isNull('should return null', <TextContainer />);
  });

  describe('with data', () => {
    const fragmentBlock = (text, attributes = []) => ({
      type: 'fragment',
      model: {
        text,
        attributes,
      },
    });

    const paragraphBlock = blocks => ({
      type: 'paragraph',
      model: {
        blocks,
      },
    });

    const data = {
      blocks: [
        paragraphBlock([fragmentBlock('This is a 1st paragraph block.')]),
        paragraphBlock([fragmentBlock('This is a 2nd paragraph block.')]),
        paragraphBlock([fragmentBlock('This is a 3rd paragraph block.')]),
        paragraphBlock([fragmentBlock('This is a 4th paragraph block..')]),
        paragraphBlock([fragmentBlock('This is a 5th paragraph block.')]),
      ],
    };

    shouldShallowMatchSnapshot(
      'should render correctly',
      <TextContainer {...data} />,
    );
  });
});
