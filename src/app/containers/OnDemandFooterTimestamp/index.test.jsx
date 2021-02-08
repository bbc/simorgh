import React from 'react';
import { render } from '@testing-library/react';
import { formatUnixTimestamp } from '@bbc/psammead-timestamp-container/utilities';

import { ServiceContextProvider } from '#contexts/ServiceContext';
import FooterTimestamp from '.';

// eslint-disable-next-line react/prop-types
const RenderTimestamp = ({ releaseDateTimeStamp, darkMode = false }) => (
  <ServiceContextProvider service="afrique">
    <FooterTimestamp
      releaseDateTimeStamp={releaseDateTimeStamp}
      darkMode={darkMode}
    />
  </ServiceContextProvider>
);

describe('OnDemandFooterTimestamp', () => {
  it('should show with the expected styling and spacing', async () => {
    const releaseDateTimeStamp = 1603065600000;
    const formattedTimestamp = formatUnixTimestamp({
      timestamp: releaseDateTimeStamp,
      format: 'LL',
      timezone: 'GMT',
      locale: 'fr',
      isRelative: false,
    });
    const dateTime = formatUnixTimestamp({
      timestamp: releaseDateTimeStamp,
      format: 'YYYY-MM-DD',
      timezone: 'GMT',
      locale: 'fr',
      isRelative: false,
    });
    const { getByText } = await render(
      <RenderTimestamp releaseDateTimeStamp={releaseDateTimeStamp} />,
    );
    const el = getByText(formattedTimestamp);
    const style = window.getComputedStyle(el);
    expect(el.tagName).toBe('TIME');
    expect(el.getAttribute('dateTime')).toBe(dateTime);
    expect(style.color).toBe('rgb(110, 110, 115)');
    expect(style.display).toBe('inline-block');
    expect(style.marginTop).toBe('0.5rem');
  });

  it('should have the right styling on dark mode', async () => {
    const releaseDateTimeStamp = 1603065600000;
    const formattedTimestamp = formatUnixTimestamp({
      timestamp: releaseDateTimeStamp,
      format: 'LL',
      timezone: 'GMT',
      locale: 'fr',
      isRelative: false,
    });
    const { getByText } = await render(
      <RenderTimestamp releaseDateTimeStamp={releaseDateTimeStamp} darkMode />,
    );
    const el = getByText(formattedTimestamp);
    const style = window.getComputedStyle(el);
    expect(el.tagName).toBe('TIME');
    expect(style.color).toBe('rgb(174, 174, 181)');
    expect(style.display).toBe('inline-block');
    expect(style.marginTop).toBe('0.5rem');
  });
});
