import React, { useContext } from 'react';
import Paragraph from '@bbc/psammead-paragraph';
import styled from '@emotion/styled';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
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
    padding-right: 40px;
  }
`;

const ParagraphContainer = ({ blocks }) => {
  const { script, service } = useContext(ServiceContext);

  return (
    <GridItemMedium>
      <StyledParagraph script={script} service={service}>
        <Blocks blocks={blocks} componentsToRender={componentsToRender} />
      </StyledParagraph>
    </GridItemMedium>
  );
};

ParagraphContainer.propTypes = paragraphModelPropTypes;

export default ParagraphContainer;
