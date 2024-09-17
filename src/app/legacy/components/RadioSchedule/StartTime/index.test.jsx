import React from 'react';
import { render } from '#components/react-testing-library-with-providers';
import latin from '#components/ThemeProvider/fontScripts/latin';
import arabic from '#components/ThemeProvider/fontScripts/arabic';
import StartTime from './index';

const testUnixTimestamp = 1566914061212;

describe('StartTime', () => {
  it('should render LTR correctly', () => {
    const { container } = render(<StartTime timestamp={testUnixTimestamp} />, {
      dir: 'ltr',
      locale: 'en-gb',
      service: 'news',
      script: { latin },
    });
    expect(container).toMatchSnapshot();
  });

  it('should render RTL correctly', () => {
    const { container } = render(<StartTime timestamp={testUnixTimestamp} />, {
      dir: 'rtl',
      locale: 'fa',
      service: 'persian',
      script: { arabic },
    });
    expect(container).toMatchSnapshot();
  });
});
