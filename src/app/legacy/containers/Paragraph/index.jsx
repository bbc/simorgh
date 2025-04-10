import React from 'react';
import styled from '@emotion/styled';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING_TRPL,
  GEL_SPACING_QUIN,
} from '#psammead/gel-foundations/src/spacings';
import { GridItemMedium } from '#components/Grid';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import Inline from '../InlineContainer';
import Paragraph from '../../../components/Paragraph';
import InlineLink from '../../../components/InlineLink';

const componentsToRender = { fragment, urlLink: InlineLink, inline: Inline };

const StyledParagraph = styled(Paragraph)`
  padding-bottom: ${GEL_SPACING_TRPL};
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding-inline-end: ${GEL_SPACING_QUIN};
  }
`;

const ParagraphContainer = ({ blocks }) => (
  <GridItemMedium>
    <StyledParagraph>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </StyledParagraph>
  </GridItemMedium>
);

export default ParagraphContainer;
