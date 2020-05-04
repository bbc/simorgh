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
    <>
      {requireIncludeTypes.includes(type) ? (
        <Helmet>
          <script
            type="text/javascript"
            src="https://news.files.bbci.co.uk/include/vjassets/js/vendor/require-2.1.20b.min.js"
          />
          {/* 
           A map of legacy modules is configured here, they are defined as require modules and 
           and may be required by the include dangerously set below
           */}
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
