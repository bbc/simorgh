import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import ErrorMain from './index';

describe('ErrorMain', () => {
  const messaging = {
    statusCode: 'StatusCode',
    title: 'A error has occured',
    message: 'Something happened, please try an option',
    solutions: ['Option one', 'Option two'],
    callToActionFirst: 'You can do ',
    callToActionLinkText: 'this',
    callToActionLinkUrl: 'https://www.bbc.com',
    callToActionLast: ' thing',
  };

  shouldMatchSnapshot(
    'should correctly render for 404',
    <ErrorMain {...messaging} />,
  );
});
