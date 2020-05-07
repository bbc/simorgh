/* eslint-disable react/no-danger */
import React, { useContext } from 'react';
import { string } from 'prop-types';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';

const IncludeContainer = ({ html, type }) => {
  const { isAmp } = useContext(RequestContext);
  const { enabled } = useToggle('include');

  const supportedTypes = {
    idt2: 'idt2',
    vj: 'vj',
  };

  const shouldNotRenderInclude =
    isAmp || !enabled || !html || !supportedTypes[type];

  if (shouldNotRenderInclude) {
    return null;
  }

  return (
    <GridItemConstrainedMedium>
      <div
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: html }}
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
