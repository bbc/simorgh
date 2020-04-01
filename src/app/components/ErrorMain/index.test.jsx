import React from 'react';
import { latin, arabic } from '@bbc/gel-foundations/scripts';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
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
    service: 'news',
  };

  shouldMatchSnapshot(
    'should correctly render for an error page for News',
    <ErrorMain {...messaging} dir="ltr" script={latin} service="news" />,
  );

  const arabicServices = ['persian', 'arabic', 'pashto', 'urdu'];
  arabicServices.forEach((service) => {
    shouldMatchSnapshot(
      `should correctly render for an error page for ${service}`,
      <ErrorMain {...messaging} dir="rtl" script={arabic} service={service} />,
    );
  });
});
