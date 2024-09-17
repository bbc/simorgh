/* eslint-disable react/no-danger */
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from '@emotion/styled';
import { GEL_SPACING_QUIN } from '#psammead/gel-foundations/src/spacings';
import { GridItemMedium } from '#legacy/components/Grid';

/**
 * Prevent Includes from being wider than their parent, whilst
 * allowing localised horizontal scrolling for content that is.
 */
const Include = styled.div`
  max-width: 100%;
  overflow: scroll hidden;
  margin-bottom: ${GEL_SPACING_QUIN};
`;

const CanonicalIncludeContainer = ({ html = null, type, index }) => {
  const supportedTypes = ['idt1', 'vj'];

  if (!html || !supportedTypes.includes(type)) return null;

  // This is a list of include types that depend on the javascript module loader requireJs.
  // These includes were built to work within the BBC's legacy publishing platform (the PAL)
  // that uses requireJS extensively. See https://github.com/bbc/simorgh/issues/5750
  const requireIncludeTypes = ['vj', 'idt1'];

  const paths = `{
    'jquery-1':
      'https://static.bbc.co.uk/frameworks/jquery/0.4.1/sharedmodules/jquery-1.7.2',
    'istats-1':
      'https://news.files.bbci.co.uk/include/vjassets/js/vendor/istats-1.0.0.min',
  }`;

  const configureAdditionalScripts = `require.config({ paths:${paths} });`;

  return (
    <GridItemMedium>
      {requireIncludeTypes.includes(type) && (
        <Helmet>
          <script
            type="text/javascript"
            src="https://news.files.bbci.co.uk/include/vjassets/js/vendor/require-2.1.20b.min.js"
          />
          <script>{configureAdditionalScripts}</script>
        </Helmet>
      )}
      <Include
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: html }}
        id={`include-${index + 1}`}
        tabIndex="-1"
      />
    </GridItemMedium>
  );
};

export default CanonicalIncludeContainer;
