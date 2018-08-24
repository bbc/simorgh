import React from 'react';
import Link from './index';

import {
  shallowRender,
  shouldMatchSnapshot,
} from '../../helpers/tests/testHelpers';

const text = 'Some link text';
const href = 'https://www.bbc.com/';

describe('Link', () => {
  shouldMatchSnapshot(
    'should render a standard block link',
    shallowRender(<Link text={text} href={href} />),
  );
  shouldMatchSnapshot(
    'should render an inline link after passing an inline prop',
    shallowRender(<Link text={text} href={href} inline />),
  );
});
