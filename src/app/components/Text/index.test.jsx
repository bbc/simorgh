import React from 'react';
import Text from './index';

import {
  shallowRender,
  shouldMatchSnapshot,
  isNull,
} from '../../helpers/tests/testHelpers';

describe('Text', () => {
  describe('with no data', () => {
    isNull('should return null', <Text />);
  });

  shouldMatchSnapshot(
    'should render bold',
    shallowRender(<Text text="This is text with **some bold formatting**." />),
  );

  shouldMatchSnapshot(
    'should render italics',
    shallowRender(<Text text="This is text with _some italic formatting_." />),
  );

  shouldMatchSnapshot(
    'should render strike-through',
    shallowRender(
      <Text text="This is text with ~~some strike-through formatting~~." />,
    ),
  );

  shouldMatchSnapshot(
    'should render inline-code',
    shallowRender(<Text text="This is text with `some inline code`." />),
  );

  shouldMatchSnapshot(
    'should render an inline link',
    shallowRender(
      <Text text="This is text that contains an [inline link](https://www.bbc.com/news) inside it." />,
    ),
  );
});
