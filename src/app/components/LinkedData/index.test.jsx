import React from 'react';
import path from 'path';
import fakeProps from 'react-fake-props';

import { shouldShallowMatchSnapshot } from '../../../testHelpers';
import LinkData from '.';

describe('LinkData', () => {
  const props = fakeProps(path.join(__dirname, './index.jsx'));
  const propsWithNoAbout = {
    ...props,
    about: null,
  };

  shouldShallowMatchSnapshot(
    'should correctly render metadata for links',
    <LinkData {...props} />,
  );

  shouldShallowMatchSnapshot(
    'should correctly render metadata with no about tags for links',
    <LinkData {...propsWithNoAbout} />,
  );
});
