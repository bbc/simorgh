/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
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
  const [markup, setMarkup] = useState(null);
  const { enabled } = useToggle('include');

  useEffect(() => {
    if (enabled) {
      setMarkup(decodeHTML(html));
    }
  }, [html, enabled]);

  const shouldNotDisplayInclude = !markup || !enabled;

  if (shouldNotDisplayInclude) {
    return null;
  }

  return (
    <GridItemConstrainedMedium>
      <div dangerouslySetInnerHTML={{ __html: markup }} />,
    </GridItemConstrainedMedium>
  );
};

IncludeContainer.propTypes = {
  html: string.isRequired,
};

export default IncludeContainer;
