import React from 'react';
import { shouldMatchSnapshot, isNull } from '../../helpers/tests/testHelpers';
import Text from './index';

describe('Text', () => {
  describe('with no data', () => {
    isNull(<Text />);
  });

  shouldMatchSnapshot(
    'should render bold',
    <Text text="This is text with **some bold formatting**." />,
  );

  shouldMatchSnapshot(
    'should render italics',
    <Text text="This is text with _some italic formatting_." />,
  );

  shouldMatchSnapshot(
    'should render strike-through',
    <Text text="This is text with ~~some strike-through formatting~~." />,
  );

  shouldMatchSnapshot(
    'should render inline-code',
    <Text text="This is text with `some inline code`." />,
  );
});
