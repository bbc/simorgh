/* eslint-disable react/no-danger */
import React from 'react';
import { string, shape, number } from 'prop-types';
import styled from '@emotion/styled';

import { Img } from '#psammead/psammead-image/src';
import { GEL_SPACING_QUIN } from '#psammead/gel-foundations/src/spacings';
import { GridItemMedium } from '#components/Grid';

const Include = styled.div`
  max-width: 100%;
  overflow: scroll hidden;
  margin-bottom: ${GEL_SPACING_QUIN};
`;

const DISALLOWED_SCRIPTS =
  /js\/verticalChart|horizontalChart|lineChart|pieChart|simpleMap|table\./;

const Idt2Canonical = ({ html, imageBlock, index }) => {
  if (!html || !imageBlock) return null;
  const { src, alt, srcset } = imageBlock;
  const isDisallowed = DISALLOWED_SCRIPTS.test(html);

  return (
    <GridItemMedium>
      {isDisallowed ? (
        <Img src={src} alt={alt} srcset={srcset} id={`include-${index + 1}`} />
      ) : (
        <Include
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: html }}
          id={`include-${index + 1}`}
        />
      )}
    </GridItemMedium>
  );
};

Idt2Canonical.propTypes = {
  html: string,
  imageBlock: shape({
    src: string.isRequired,
    alt: string.isRequired,
    srcset: string,
  }),
  index: number.isRequired,
};

Idt2Canonical.defaultProps = {
  html: null,
  imageBlock: null,
};

export default Idt2Canonical;
