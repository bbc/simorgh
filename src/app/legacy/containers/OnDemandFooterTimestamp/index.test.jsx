import React from 'react';
import { render } from '@testing-library/react';
import { formatUnixTimestamp } from '#psammead/psammead-timestamp-container/src/utilities';

import { ServiceContextProvider } from '../../../contexts/ServiceContext';
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
    expect(el.tagName).toBe('TIME');
    expect(el.getAttribute('dateTime')).toBe(dateTime);
  });
});
