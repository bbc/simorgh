import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { string, elementType, number } from 'prop-types';
import {
  AMP_LIST_JS,
  AMP_MUSTACHE_JS,
} from '@bbc/psammead-assets/amp-boilerplate';
import { ServiceContext } from '#contexts/ServiceContext';
import MostReadList from '../Canonical/List';
import { MostReadItemWrapper, MostReadLink } from '../Canonical/Item';
import MostReadRank from '../Canonical/Rank';
import generateCSPHash from './scriptHashCalculator';

const AmpMostRead = ({ endpoint, size, wrapper: Wrapper }) => {
  const {
    service,
    script,
    dir,
    mostRead: { numberOfItems },
  } = useContext(ServiceContext);

  const test = `
  const translations = {
    bengali: ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯', '১০'],
    burmese: ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉', '၁၀'],
    nepali: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९', '१०'],
    EasternArabic: ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹','۱۰'],
  }
  const WesternArabic = ['0','1','2','3','4','5','6','7','8','9','10'];
  function getRemoteData() {
    return fetch("${endpoint}")
      .then(resp => resp.json())
      .then(resp => {const respSlice = resp.records.slice(0,${size}); resp.records=respSlice; return resp;})
      .then(resp => {resp.records.forEach((item, index) => item.rankTranslation = translations["${service}"]? translations["${service}"][[index+1]]: WesternArabic[index+1]); return resp;})
  }
  exportFunction('getRemoteData', getRemoteData);
`;

  const testtwo = `const translations = {
    bengali: ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯', '১০'],
    burmese: ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉', '၁၀'],
    nepali: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९', '१०'],
    EasternArabic: ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹','۱۰'],
  }
  const WesternArabic = ['0','1','2','3','4','5','6','7','8','9','10'];
  function getRemoteData() {
    return fetch("${endpoint}")
      .then(resp => resp.json())
      .then(resp => {const respSlice = resp.records.slice(0,${size}); resp.records=respSlice; return resp;})
      .then(resp => {resp.records.forEach((item, index) => item.rankTranslation = translations["${service}"]? translations["${service}"][[index+1]]: WesternArabic[index+1]); return resp;})
  }
  exportFunction('getRemoteData', getRemoteData);`;

  return (
    <Wrapper>
      {/* Import required amp scripts for most read */}
      <Helmet>
        {AMP_LIST_JS}
        {AMP_MUSTACHE_JS}
        <script
          async
          custom-element="amp-script"
          src="https://cdn.ampproject.org/v0/amp-script-0.1.js"
        />
        <meta name="amp-script-src" content={generateCSPHash(test)} />
      </Helmet>

      <amp-script
        id="dataFunctions"
        script="local-script"
        width="1"
        height="1"
      />
      <script
        id="local-script"
        type="text/plain"
        target="amp-script"
        dangerouslySetInnerHTML={{
          __html: test,
        }}
      />

      <MostReadList
        numberOfItems={numberOfItems}
        dir={dir}
        columnLayout="ampOneColumn"
      >
        <amp-list
          width="300"
          height="100"
          layout="responsive"
          src="amp-script:dataFunctions.getRemoteData"
          items="records"
          max-items={numberOfItems}
        >
          <template type="amp-mustache">
            <MostReadItemWrapper dir={dir} columnLayout="ampOneColumn">
              <MostReadRank
                service={service}
                script={script}
                numberOfItems={numberOfItems}
                listIndex={'{{rankTranslation}}'}
                dir={dir}
                columnLayout="oneColumn"
                size={size}
                isAmp
              />
              <MostReadLink
                dir={dir}
                service={service}
                script={script}
                title={'{{promo.headlines.shortHeadline}}'}
                href={'{{promo.locators.assetUri}}'}
                size={size}
              />
            </MostReadItemWrapper>
          </template>
        </amp-list>
      </MostReadList>
    </Wrapper>
  );
};

AmpMostRead.propTypes = {
  endpoint: string,
  size: number,
  wrapper: elementType,
};

AmpMostRead.defaultProps = {
  endpoint: '',
  size: 100,
  wrapper: React.Fragment,
};
export default AmpMostRead;
