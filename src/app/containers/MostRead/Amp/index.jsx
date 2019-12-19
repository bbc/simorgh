import React from 'react';
import { oneOf, string, shape } from 'prop-types';
import { Helmet } from 'react-helmet';
import { Template } from 'react-amphtml';
import {
  AMP_ACCESS_JS,
  AMP_MUSTACHE_JS,
} from '@bbc/psammead-assets/amp-boilerplate';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import {
  MostReadTitle,
  MostReadList,
  MostReadLink,
  MostReadRank,
  MostReadItemWrapper,
} from '#app/components/MostRead';

const AMP_ACCESS_DATA = endpoint => ({
  authorization: endpoint,
  noPingback: true,
});

const AMP_ACCESS_FETCH = endpoint => (
  <script id="amp-access" type="application/json">
    {JSON.stringify(AMP_ACCESS_DATA(endpoint))}
  </script>
);

const AmpMostRead = ({ endpoint, service, script, dir }) => (
  <>
    <Helmet>
      <script
        async
        custom-element="amp-date-display"
        src="https://cdn.ampproject.org/v0/amp-date-display-0.1.js"
      ></script>
      {AMP_ACCESS_JS}
      {AMP_MUSTACHE_JS}
      {AMP_ACCESS_FETCH(endpoint)}
    </Helmet>
    <section amp-access="oldContent != false">
      <Template
        specName="default"
        type="amp-mustache"
        amp-access-template="true"
      >
        <MostReadTitle
          header="Most Read Amp"
          service={service}
          script={script}
        />
        <MostReadList dir={dir}>
          {'{{#records}}'}
          <MostReadItemWrapper dir={dir}>
            <MostReadRank
              service={service}
              script={script}
              dir={dir}
              rank={'{{rank}}'}
            />

            <MostReadLink
              title={'{{promo.headlines.shortHeadline}}'}
              href={'{{promo.locators.assetUri}}'}
              service={service}
              script={script}
              dir={dir}
            >
              <amp-date-display
                timestamp-ms={'{{promo.timestamp.raw}}'}
                width="150"
                height="20"
              >
                <template type="amp-mustache">
                  {'{{ day }} {{ monthName }} {{ year }}'}
                </template>
              </amp-date-display>
            </MostReadLink>
          </MostReadItemWrapper>

          {'{{/records}}'}
        </MostReadList>
      </Template>
    </section>
  </>
);

AmpMostRead.propTypes = {
  endpoint: string.isRequired,
  service: string.isRequired,
  script: shape(scriptPropType).isRequired,
  dir: oneOf(['rtl', 'ltr']),
};

AmpMostRead.defaultProps = {
  dir: 'ltr',
};

export default AmpMostRead;
