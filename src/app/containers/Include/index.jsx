/* eslint-disable react/no-danger */
import React from 'react';
import { string } from 'prop-types';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import useToggle from '../Toggle/useToggle';

const decodeHTML = str => {
  const replacedParts = {
    '&quot;': '"',
    '&#39;': "'",
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
  };
  const replacementsRegex = new RegExp(
    Object.keys(replacedParts).join('|'),
    'gi',
  );
  return str.replace(replacementsRegex, match => replacedParts[match]);
};

const IncludeContainer = ({ html, type }) => {
  const { enabled } = useToggle('include');

  const supportedTypes = {
    idt2: 'idt2',
    vj: 'vj',
  };

  const shouldNotRenderInclude = !enabled || !html || !supportedTypes[type];

  if (shouldNotRenderInclude) {
    return null;
  }

  return (
    <GridItemConstrainedMedium>
      <div
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: decodeHTML(html) }}
      />
    </GridItemConstrainedMedium>
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
