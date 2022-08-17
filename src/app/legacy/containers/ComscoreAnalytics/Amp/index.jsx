import React from 'react';

const AmpComscoreAnalytics = () => (
  <amp-analytics type="comscore">
    <script
      type="application/json"
      /* eslint-disable-next-line react/no-danger */
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          vars: {
            c2: '17986528',
          },
          extraUrlParams: {
            comscorekw: 'amp',
          },
        }),
      }}
    />
  </amp-analytics>
);

export default AmpComscoreAnalytics;
