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

const DISALLOWED_SCRIPTS = /js\/verticalChart|horizontalChart|lineChart|pieChart|simpleMap|table\./;

const Idt2Canonical = ({ html, imageBlock, indexOfInclude }) => {
  if (!html || !imageBlock) return null;
  const { src, alt, srcset } = imageBlock;
  const isDisallowed = DISALLOWED_SCRIPTS.test(html);

  return (
    <IncludeGrid>
      {isDisallowed ? (
        <Img
          src={src}
          alt={alt}
          srcset={srcset}
          id={`include-${indexOfInclude + 1}`}
        />
      ) : (
        <Include
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: html }}
          id={`include-${indexOfInclude + 1}`}
        />
      )}
    </IncludeGrid>
  );
};

Idt2Canonical.propTypes = {
  html: string,
  imageBlock: shape({
    src: string.isRequired,
    alt: string.isRequired,
    srcset: string,
  }),
  indexOfInclude: number.isRequired,
};

Idt2Canonical.defaultProps = {
  html: null,
  imageBlock: null,
};

export default Idt2Canonical;
