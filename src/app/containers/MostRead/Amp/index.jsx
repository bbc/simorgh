import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { string, oneOf, elementType } from 'prop-types';
import {
  Burmese,
  Bengali,
  EasternArabic,
  Nepali,
  WesternArabic,
} from '@bbc/psammead-locales/numerals';
import {
  AMP_LIST_JS,
  AMP_MUSTACHE_JS,
  AMP_SCRIPT_JS,
} from '@bbc/psammead-assets/amp-boilerplate';
import { ServiceContext } from '#contexts/ServiceContext';

const translations = {
  bengali: Bengali,
  burmese: Burmese,
  easternArabic: EasternArabic,
  nepali: Nepali,
};

const rankTranslationScript = (endpoint, service) => {
  return `
    const translations = ${translations};
    const westernArabic = ${WesternArabic}
    function getRemoteData() { 
      return fetch("${endpoint}")
        .then(resp => resp.json())
        .then(resp => {
          resp.records.forEach((item, index) => item.rankTranslation = translations["${service}"]? translations["${service}"][[index+1]]: westernArabic[index+1]);
          return resp;
        })
      }
    exportFunction('getRemoteData', getRemoteData);
  `;
};

const AmpMostRead = ({ endpoint, size, wrapper: Wrapper }) => {
  const {
    service,
    script,
    dir,
    mostRead: { numberOfItems },
  } = useContext(ServiceContext);

  // eslint-disable-next-line prettier/prettier
  const onlyinnerscript = rankTranslationScript(endpoint, service)

  return (
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
    </Wrapper>
  );
};

AmpMostRead.propTypes = {
  endpoint: string.isRequired,
  size: oneOf(['default', 'small']),
  wrapper: elementType,
};

AmpMostRead.defaultProps = {
  size: 'default',
  wrapper: React.Fragment,
};

export default AmpMostRead;
