import React from 'react';
import Footer from './index';

import {
  shallowRender,
  shouldMatchSnapshot,
} from '../../helpers/tests/testHelpers';

describe(`Footer`, () => {
  const link = {
    href: 'https://www.bbc.co.uk/news',
    text: 'Link',
  };

  const links = [link];

  shouldMatchSnapshot(
    'should render correctly',
    shallowRender(
      <Footer links={links} copyrightText="Text here. " externalLink={link} />,
    ),
  );
});
