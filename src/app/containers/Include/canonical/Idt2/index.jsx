/* eslint-disable react/no-danger */
import React from 'react';
import { string, shape, number } from 'prop-types';
import styled from 'styled-components';

import { Img } from '@bbc/psammead-image';
import { GEL_SPACING_QUIN } from '@bbc/gel-foundations/spacings';
import { GridItemConstrainedMedium } from '#lib/styledGrid';

const IncludeGrid = styled(GridItemConstrainedMedium)`
  display: grid;
`;

const Include = styled.div`
  max-width: 100%;
  overflow: scroll hidden;
  margin-bottom: ${GEL_SPACING_QUIN};
`;

const SCRIPT_BLACKLIST = [
  /js\/verticalChart\./,
  /js\/horizontalChart\./,
  /js\/lineChart\./,
  /js\/pieChart\./,
  /js\/simpleMap\./,
  /js\/table\./,
];

const Idt2Canonical = ({ html, imageBlock }) => {
  if (!html || !imageBlock) return null;
  const { src } = imageBlock;
  const isBlacklisted = SCRIPT_BLACKLIST.some(script => script.test(html));

  return (
    <IncludeGrid>
      {isBlacklisted ? (
        <Img src={src} />
      ) : (
        <Include
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </IncludeGrid>
  );
};

Idt2Canonical.propTypes = {
  html: string,
  imageBlock: shape({
    src: string,
    srcset: string,
    height: number,
    width: number,
    alt: string,
    layout: string,
  }).isRequired,
};

Idt2Canonical.defaultProps = {
  html: null,
};

export default Idt2Canonical;
