import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import latin from '../../../components/ThemeProvider/fontScripts/latin';
import arabic from '../../../components/ThemeProvider/fontScripts/arabic';
import ThemeProvider from '../../../components/ThemeProvider';
import ErrorMain from './index';

jest.mock('../../../components/ThemeProvider');

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
    <ThemeProvider service="news" variant="default">
      <ErrorMain {...messaging} dir="ltr" script={latin} service="news" />,
    </ThemeProvider>,
  );

  const arabicServices = ['persian', 'arabic', 'pashto', 'urdu'];
  arabicServices.forEach(service => {
    shouldMatchSnapshot(
      `should correctly render for an error page for ${service}`,
      <ThemeProvider service={service} variant="default">
        <ErrorMain {...messaging} dir="rtl" script={arabic} service={service} />
      </ThemeProvider>,
    );
  });
});
