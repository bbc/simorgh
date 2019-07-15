import React from 'react';
import styled from 'styled-components';
import deepGet from '../../lib/utilities/deepGet';
import Canonical from './canonical';
import Amp from './amp';
import {
  NestedGridParentLarge,
  NestedGridParentSmall,
  NestedGridItemChildSmall,
  NestedGridItemChildLarge,
  GridItemConstrainedLargeNoMargin,
  GridItemConstrainedSmall,
} from '../../lib/styledGrid';

import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '../../models/propTypes';

import filterForBlockType from '../../lib/utilities/blockHandlers';
import { RequestContext } from '../../contexts/RequestContext';

const selectWrappers = orientation => {
  const wrapperSpan = {
    default: '6',
    group5: '12',
  };
  let ParentWrapper = NestedGridParentLarge;
  let ChildWrapper = NestedGridItemChildLarge;
  let Container = GridItemConstrainedLargeNoMargin;

  if (orientation === 'Portrait') {
    ParentWrapper = NestedGridParentSmall;
    ChildWrapper = NestedGridItemChildSmall;
    Container = GridItemConstrainedSmall;
    wrapperSpan.default = '4';
  }

  return { ParentWrapper, ChildWrapper, Container, wrapperSpan };
};

const MediaPlayerContainer = ({ blocks }) => {
  const ratio16By9 = '56.25%';
  const ratio9By16 = '177.78%';
  const { platform } = React.useContext(RequestContext);

  if (!blocks) {
    return null;
  }

  const aresMediaBlock = filterForBlockType(blocks, 'aresMedia');

  if (!aresMediaBlock) {
    return null;
  }

  const nestedModel = deepGet(['model', 'blocks', 0, 'model'], aresMediaBlock);
  const orientation = deepGet(['versions', 0, 'types', 0], nestedModel);
  const platformToRender = platform === 'canonical' ? <Canonical /> : <Amp />;

  const StyledContainer = styled.div`
    padding-top: ${orientation === 'Portrait' ? ratio9By16 : ratio16By9};
    position: relative;
    overflow: hidden;
  `;

  const {
    ParentWrapper,
    ChildWrapper,
    Container,
    wrapperSpan,
  } = selectWrappers(orientation);

  return (
    <Container>
      <ParentWrapper>
        <ChildWrapper gridColumnStart={1} gridSpan={wrapperSpan}>
          <StyledContainer>{platformToRender}</StyledContainer>
        </ChildWrapper>
      </ParentWrapper>
    </Container>
  );
};

MediaPlayerContainer.propTypes = mediaPlayerPropTypes;
MediaPlayerContainer.defaultProps = emptyBlockArrayDefaultProps;

export default MediaPlayerContainer;
