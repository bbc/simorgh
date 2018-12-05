import React from 'react';
import { shouldMatchSnapshot, isNull } from '../../helpers/tests/testHelpers';
import TextContainer from './index';

describe('TextContainer', () => {
  describe('with no data', () => {
    isNull(<TextContainer />);
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

    shouldMatchSnapshot('should render correctly', <TextContainer {...data} />);

    describe('with a passed previous block type', () => {
      shouldMatchSnapshot(
        'should render correctly',
        <TextContainer {...data} typeOfPreviousBlock="text" />,
      );
    });
  });
});
