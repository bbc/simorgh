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
      {AMP_ACCESS_JS}
      {AMP_MUSTACHE_JS}
      {AMP_ACCESS_FETCH(endpoint)}
    </Helmet>
    <section amp-access="totalRecords > 0">
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
            {/* {'{{#promo.60daysOld}}'} */}
            {/* <p>{'{{ promo.timestamp }}'}</p> */}
            {/* {'{{#promo.60daysOld}}'} */}

            <MostReadLink
              title={'{{promo.headlines.shortHeadline}}'}
              href={'{{promo.locators.assetUri}}'}
              service={service}
              script={script}
              dir={dir}
              lastUpdated={'{{ promo.timestamp }}'}
            />
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

export default AmpMostRead;
