/* eslint-disable react/no-danger */
import React from 'react';
import styled from '@emotion/styled';

import { Img } from '#psammead/psammead-image/src';
import { GEL_SPACING_QUIN } from '#psammead/gel-foundations/src/spacings';
import { GridItemMedium } from '#legacy/components/Grid';

const Include = styled.div`
  max-width: 100%;
  overflow: scroll hidden;
  margin-bottom: ${GEL_SPACING_QUIN};
`;

const DISALLOWED_SCRIPTS =
  /js\/verticalChart|horizontalChart|lineChart|pieChart|simpleMap|table\./;

const Idt2Canonical = ({ html = null, imageBlock = null, index }) => {
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

export default Idt2Canonical;
