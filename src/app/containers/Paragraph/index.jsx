import React, { useContext } from 'react';
import Paragraph from '#legacy/psammead-paragraph/src';
import styled from '@emotion/styled';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '#legacy/gel-foundations/src/breakpoints';
import { GEL_SPACING_QUIN } from '#legacy/gel-foundations/src/spacings';
import { ServiceContext } from '#contexts/ServiceContext';
import { paragraphModelPropTypes } from '#models/propTypes/paragraph';
import { GridItemMedium } from '#app/components/Grid';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import InlineLink from '../InlineLink';
import Inline from '../InlineContainer';

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
