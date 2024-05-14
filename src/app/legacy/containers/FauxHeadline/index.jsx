import React, { useContext } from 'react';
import styled from '@emotion/styled';
import path from 'ramda/src/path';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
  GEL_SPACING_QUIN,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import { Headline } from '#psammead/psammead-headings/src';
import { GridItemLarge } from '#components/Grid';
import { ServiceContext } from '../../../contexts/ServiceContext';
import Fragment from '../Fragment';
import Blocks from '../Blocks';

// missing CSS 'display: block;' in psammead branch `explicitly-set-h1-styles-display-and-font-weight`
const FauxHeadline = props => <Headline as="strong" {...props} />;

const StyledFauxHeadline = styled(FauxHeadline)`
  @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding: ${GEL_SPACING} 0 ${GEL_SPACING_QUAD};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_SPACING_DBL} 0 ${GEL_SPACING_QUIN};
  }
`;

const FauxHeadlineContainer = ({
  blocks = [
    {
      model: {
        blocks: [
          {
            model: {},
          },
        ],
      },
    },
  ],
}) => {
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
    <GridItemLarge>
      <StyledFauxHeadline script={script} service={service}>
        {renderText()}
      </StyledFauxHeadline>
    </GridItemLarge>
  );
};

export default FauxHeadlineContainer;
