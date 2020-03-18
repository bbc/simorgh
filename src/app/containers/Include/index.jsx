/* eslint-disable react/no-danger */
import React from 'react';
import { string } from 'prop-types';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import useToggle from '../Toggle/useToggle';

const decodeHTML = str => {
  const replacedParts = {
    '&quot;': '"',
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

const IncludeContainer = ({ html }) => {
  const { enabled } = useToggle('include');

  if (!enabled) {
    return null;
  }

  return (
    <GridItemConstrainedMedium>
      <div dangerouslySetInnerHTML={{ __html: decodeHTML(html) }} />
    </GridItemConstrainedMedium>
  );
};

IncludeContainer.propTypes = {
  html: string.isRequired,
};

export default IncludeContainer;
