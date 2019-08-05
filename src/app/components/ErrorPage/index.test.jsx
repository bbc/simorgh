import React from 'react';
import { latin, arabic } from '@bbc/gel-foundations/scripts';
import { shouldMatchSnapshot } from '../../../testHelpers';
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
    'should correctly render for an error page for News',
    <ErrorMain {...messaging} script={latin} service="news" />,
  );

  shouldMatchSnapshot(
    'should correctly render for an error page for Persian',
    <ErrorMain {...messaging} script={arabic} service="persian" />,
  );
});
