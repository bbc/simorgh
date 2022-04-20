import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { string, oneOf, elementType } from 'prop-types';
import {
  AMP_LIST_JS,
  AMP_MUSTACHE_JS,
  AMP_SCRIPT_JS,
} from '@bbc/psammead-assets/amp-boilerplate';
import { ServiceContext } from '#contexts/ServiceContext';
import crypto from 'crypto';
import MostReadList from '../Canonical/List';
import { MostReadItemWrapper, MostReadLink } from '../Canonical/Item';
import MostReadRank, { serviceNumerals } from '../Canonical/Rank';

function generateCSPHash(script) {
  const hash = crypto.createHash('sha384');
  const data = hash.update(script, 'utf8');
  return `sha384-${data
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')}`;
}

const rankTranslationScript = (endpoint, service) => {
  const translation = serviceNumerals(service);
  return `
  const translations = ${JSON.stringify(translation)}
  const getRemoteData = async () => {
    try{
      const response = await fetch("${endpoint}");
      const data = await response.json();
      data.records.forEach((item, index) => {
        return item.rankTranslation = translations[index+1]
      });
      return data;
    } catch(error){
      document.body.removeChild(document.body.firstElementChild)
      return {};
    }
  }
    exportFunction('getRemoteData', getRemoteData);`;
};

const AmpMostRead = ({ endpoint, size, wrapper: Wrapper }) => {
  const {
    service,
    script,
    dir,
    mostRead: { numberOfItems },
  } = useContext(ServiceContext);

  const onlyinnerscript = rankTranslationScript(endpoint, service);

  return (
    <amp-script id="dataFunctions" script="local-script">
      <Wrapper>
        <Helmet
          script={[
            {
              id: 'local-script',
              type: 'text/plain',
              target: 'amp-script',
              innerHTML: onlyinnerscript,
            },
          ]}
        />
        <Helmet>
          {/* Import required amp scripts for most read */}
          {AMP_LIST_JS}
          {AMP_MUSTACHE_JS}
          {AMP_SCRIPT_JS}
          <meta
            name="amp-script-src"
            content={generateCSPHash(onlyinnerscript)}
          />
        </Helmet>

        <MostReadList
          numberOfItems={numberOfItems}
          dir={dir}
          columnLayout="oneColumn"
        >
          <amp-list
            src="amp-script:dataFunctions.getRemoteData"
            items="records"
            max-items={numberOfItems}
            layout="responsive"
            width="300"
            height="100"
          >
            <template type="amp-mustache">
              <MostReadItemWrapper dir={dir} columnLayout="oneColumn">
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
    </amp-script>
  );
};

AmpMostRead.propTypes = {
  endpoint: string,
  size: oneOf(['default', 'small']),
  wrapper: elementType,
};

AmpMostRead.defaultProps = {
  endpoint: '',
  size: 'default',
  wrapper: React.Fragment,
};

export default AmpMostRead;
