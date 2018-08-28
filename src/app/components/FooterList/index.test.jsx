import React from 'react';
import FooterList from './index';

import {
  shallowRender,
  shouldMatchSnapshot,
} from '../../helpers/tests/testHelpers';

describe(`FooterList`, () => {
  const link = {
    href: 'https://www.bbc.co.uk/news',
    text: 'Link',
  };

  const links = [link];

  shouldMatchSnapshot(
    'should render correctly',
    shallowRender(<FooterList links={links} />),
  );
});
