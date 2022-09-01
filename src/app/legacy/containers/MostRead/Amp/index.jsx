import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { string, oneOf, elementType } from 'prop-types';
import styled from '@emotion/styled';
import {
  AMP_LIST_JS,
  AMP_MUSTACHE_JS,
  AMP_SCRIPT_JS,
} from '#psammead/psammead-assets/src/amp-boilerplate';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import pathOr from 'ramda/src/pathOr';
import { C_SHADOW } from '#psammead/psammead-styles/src/colours';
import { getBodyCopy } from '#psammead/gel-foundations/src/typography';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import { MostReadItemWrapper, MostReadLink } from '../Canonical/Item';
import MostReadRank, { serviceNumerals } from '../Canonical/Rank';
import generateCSPHash from '../utilities/generateCPSHash';

const rankTranslationScript = (endpoint, service) => {
  const translation = serviceNumerals(service);
  return `
  const translations = ${JSON.stringify(translation)}
  const getRemoteData = async () => {
    try{
      const response = await fetch("${endpoint}");
      const data = await response.json();

      if(data.records.length === 0){
        throw new Error("Empty records from mostread endpoint");
      }

      data.records.forEach((item, index) => {
        item.rankTranslation = translations[index+1];

        if (!item.promo.headlines.shortHeadline) {
          item.promo.headlines.shortHeadline = item.promo.headlines.seoHeadline;
        }
      });

      return data;
    } catch(error){
      console.warn(error);
      return [];
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
    translations,
  } = useContext(ServiceContext);

  const onlyinnerscript = rankTranslationScript(endpoint, service);

  const FallbackText = styled.p`
    ${() => getSansRegular(service)}
    ${() => getBodyCopy(script)}
    color: ${C_SHADOW};
    margin: 0;
  `;

  const fallbackText = pathOr(
    'Content is not available',
    ['socialEmbed', 'fallback', 'text'],
    translations,
  );

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
            content={generateCSPHash(
              onlyinnerscript,
              'sha384',
              'utf8',
              'base64',
            )}
          />
        </Helmet>

        <amp-list
          src="amp-script:dataFunctions.getRemoteData"
          items="records"
          max-items={numberOfItems}
          layout="responsive"
          width="300"
          height="50"
        >
          <FallbackText fallback="" service={service} script={script}>
            {fallbackText}
          </FallbackText>

          <template type="amp-mustache">
            <MostReadItemWrapper dir={dir} columnLayout="oneColumn">
              <MostReadRank
                service={service}
                script={script}
                numberOfItems={numberOfItems}
                listIndex="{{rankTranslation}}"
                dir={dir}
                columnLayout="oneColumn"
                size={size}
                isAmp
              />
              <MostReadLink
                dir={dir}
                service={service}
                script={script}
                title="{{promo.headlines.shortHeadline}}"
                href="{{promo.locators.assetUri}}"
                size={size}
              />
            </MostReadItemWrapper>
          </template>
        </amp-list>
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
