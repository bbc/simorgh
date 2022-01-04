import React, { useContext } from 'react';
import Paragraph from '@bbc/psammead-paragraph';
import styled from '@emotion/styled';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import { GEL_SPACING_QUIN } from '@bbc/gel-foundations/spacings';
import { ServiceContext } from '#contexts/ServiceContext';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import InlineLink from '../InlineLink';
import Inline from '../InlineContainer';
import { paragraphModelPropTypes } from '#models/propTypes/paragraph';
import { GridItemMedium } from '#app/components/Grid';

const componentsToRender = { fragment, urlLink: InlineLink, inline: Inline };

const StyledParagraph = styled(Paragraph)`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    ${({ dir }) =>
      dir === 'ltr'
        ? `padding-right: ${GEL_SPACING_QUIN};`
        : `padding-left: ${GEL_SPACING_QUIN};`}
  }
`;

const ParagraphContainer = ({ blocks }) => {
  const { script, service, dir } = useContext(ServiceContext);

  return (
    <GridItemMedium>
      <StyledParagraph script={script} service={service} dir={dir}>
        <Blocks blocks={blocks} componentsToRender={componentsToRender} />
      </StyledParagraph>
    </GridItemMedium>
  );
};

ParagraphContainer.propTypes = paragraphModelPropTypes;

export default ParagraphContainer;
