import React from 'react';
import path from 'path';
import { latin, arabic } from '@bbc/gel-foundations/scripts';
import fakeProps from 'react-fake-props';
import { shouldMatchSnapshot } from '../../../testHelpers';
import ErrorMain from './index';

describe('ErrorMain', () => {
  const messaging = fakeProps(path.join(__dirname, './index.jsx'));

  shouldMatchSnapshot(
    'should correctly render for an error page for News',
    <ErrorMain {...messaging} script={latin} />,
  );

  shouldMatchSnapshot(
    'should correctly render for an error page for Persian',
    <ErrorMain {...messaging} script={arabic} />,
  );

  shouldMatchSnapshot(
    'should correctly render multiple solutions',
    <ErrorMain
      {...messaging}
      script={latin}
      solutions={['Solution A', 'Solution B']}
    />,
  );
});
