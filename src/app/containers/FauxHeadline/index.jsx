import React, { useContext } from 'react';
import styled from 'styled-components';
import path from 'ramda/src/path';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
  GEL_SPACING_QUIN,
} from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import { Headline } from '@bbc/psammead-headings';
import { textDefaultPropTypes } from '#models/propTypes';
import { ServiceContext } from '#contexts/ServiceContext';
import { headlineModelPropTypes } from '#models/propTypes/headline';
import Fragment from '../Fragment';
import Blocks from '../Blocks';
import { GridItemConstrainedLarge } from '#lib/styledGrid';

// missing CSS 'display: block;' in psammead branch `explicitly-set-h1-styles-display-and-font-weight`
const FauxHeadline = props => <Headline as="strong" {...props} />;

const StyledFauxHeadline = styled(FauxHeadline)`
  padding: ${GEL_SPACING} 0 ${GEL_SPACING_QUAD};

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_SPACING_DBL} 0 ${GEL_SPACING_QUIN};
  }
`;

const FauxHeadlineContainer = ({ blocks }) => {
  const { script, service } = useContext(ServiceContext);

  const arrayOfFragments = path(
    ['0', 'model', 'blocks', '0', 'model', 'blocks'],
    blocks,
  );

  if (!arrayOfFragments || !Array.isArray(arrayOfFragments)) {
    return null;
  }
  const componentsToRender = { fragment: Fragment };

  const renderText = () => (
    <Blocks blocks={arrayOfFragments} componentsToRender={componentsToRender} />
  );

  return (
    <GridItemConstrainedLarge>
      <StyledFauxHeadline script={script} service={service} aria-hidden="true">
        {renderText()}
      </StyledFauxHeadline>
    </GridItemConstrainedLarge>
  );
};

FauxHeadlineContainer.propTypes = {
  ...headlineModelPropTypes,
};

FauxHeadlineContainer.defaultProps = textDefaultPropTypes;

export default FauxHeadlineContainer;
