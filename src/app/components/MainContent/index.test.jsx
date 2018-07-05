import React from 'react';
import { shouldMatchSnapshot, isNull } from '../../helpers/tests/testHelpers';
import { headingBlock, textBlock } from '../../models/blocks';
import MainContent from './index';

const heading = 'This is a headline';
const text = 'This is some text content!';

describe('MainContent', () => {
  const validData = [headingBlock(heading), textBlock(text), textBlock(text)];

  shouldMatchSnapshot(
    'should render correctly',
    <MainContent {...validData} />,
  );

  shouldMatchSnapshot(
    'should render correctly',
    <MainContent {...validData} />,
  );

  describe('with no data', () => {
    isNull('should return null', <MainContent />);
  });

  describe('with data', () => {
    isNull('should return null', <MainContent blocks={[]} />);
  });
});
