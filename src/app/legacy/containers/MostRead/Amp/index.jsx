import React, { useContext } from 'react';
import { useTheme } from '@emotion/react';
import { Helmet } from 'react-helmet';
import { elementType } from 'prop-types';
import styled from '@emotion/styled';
import {
  AMP_LIST_JS,
  AMP_MUSTACHE_JS,
  AMP_SCRIPT_JS,
} from '#psammead/psammead-assets/src/amp-boilerplate';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import pathOr from 'ramda/src/pathOr';
import { getBodyCopy } from '#psammead/gel-foundations/src/typography';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import generateCSPHash from '../utilities/generateCPSHash';

const AmpMostRead = ({ wrapper: Wrapper }) => {
  const {
    service,
    script,
    mostRead: { numberOfItems },
    translations,
  } = useContext(ServiceContext);

  const {
    palette: { SHADOW },
  } = useTheme();

  const FallbackText = styled.p`
    ${() => getSansRegular(service)}
    ${() => getBodyCopy(script)}
    /* eslint-disable-next-line react/prop-types */
    color: ${SHADOW};
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
            content={generateCSPHash('sha384', 'utf8', 'base64')}
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
        </amp-list>
      </Wrapper>
    </amp-script>
  );
};

AmpMostRead.propTypes = {
  wrapper: elementType,
};

AmpMostRead.defaultProps = {
  wrapper: React.Fragment,
};

export default AmpMostRead;
