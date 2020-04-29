/* eslint-disable react/no-danger */
import React from 'react';
import { string } from 'prop-types';
import { Helmet } from 'react-helmet';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import useToggle from '#hooks/useToggle';

const IncludeContainer = ({ html, type }) => {
  const { enabled } = useToggle('include');

  const supportedTypes = {
    idt2: 'idt2',
    vj: 'vj',
    idt1: 'idt1',
  };

  const shouldNotRenderInclude = !enabled || !html || !supportedTypes[type];

  if (shouldNotRenderInclude) {
    return null;
  }

  const requireIncludeTypes = ['vj', 'idt1'];

  const paths = `{
    'jquery-1':
      'https://static.bbc.co.uk/frameworks/jquery/0.4.1/sharedmodules/jquery-1.7.2',
    'istats-1':
      'https://nav.files.bbci.co.uk/orbit-webmodules/0.0.2-448.45dcd56/istats/istats-1',
  }`;

  const configureAdditionalScripts = `window.requre && require.config({ paths:${paths} });`;

  return (
    <>
      {requireIncludeTypes.includes(type) ? (
        <Helmet>
          <script
            type="text/javascript"
            src="https://news.files.bbci.co.uk/include/vjassets/js/vendor/require-2.1.20b.min.js"
          />
          <script>{configureAdditionalScripts}</script>
        </Helmet>
      ) : null}
      <GridItemConstrainedMedium>
        <div
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </GridItemConstrainedMedium>
    </>
  );
};

IncludeContainer.propTypes = {
  html: string,
  type: string.isRequired,
};

IncludeContainer.defaultProps = {
  html: null,
};

export default IncludeContainer;
