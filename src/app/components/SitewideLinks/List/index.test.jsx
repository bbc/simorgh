import React from 'react';
import List from './index';

import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';

describe(`List`, () => {
  const link = {
    href: 'https://www.bbc.co.uk/news',
    text: 'Link',
  };

  const links = [link];

  shouldMatchSnapshot('should render correctly', <List links={links} />);
});
