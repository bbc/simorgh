import React from 'react';
import { shouldMatchSnapshot, isNull } from '../../helpers/tests/testHelpers';
import Markdown from './index';

describe('Markdown', () => {
  describe('with no data', () => {
    isNull('should return null', <Markdown />);
  });

  shouldMatchSnapshot(
    'should render bold',
    <Markdown text="This is text with **some bold formatting**." />,
  );

  shouldMatchSnapshot(
    'should render italics',
    <Markdown text="This is text with __some italic formatting__." />,
  );

  shouldMatchSnapshot(
    'should render strike-through',
    <Markdown text="This is text with ~~some strike-through formatting~~." />,
  );

  shouldMatchSnapshot(
    'should render inline-code',
    <Markdown text="This is text with `some inline code`." />,
  );
});
