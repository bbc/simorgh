import React from 'react';
import Footer from './index';

import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

describe(`Footer`, () => {
  const link = {
    href: 'https://www.bbc.co.uk/news',
    text: 'Link',
  };

  const list = [link];

  shouldMatchSnapshot(
    'should render correctly',
    <Footer list={list} text="Text here. " link={link} />,
  );
});
