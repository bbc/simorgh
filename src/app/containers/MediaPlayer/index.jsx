import React from 'react';
import pathOr from 'ramda/src/pathOr';
import styled from 'styled-components';
import Canonical from './Canonical';
import Metadata from './Metadata';
import embedUrl from './helpers/embedUrl';
import filterForBlockType from '../../lib/utilities/blockHandlers';
import useToggle from '../Toggle/useToggle';
import { RequestContext } from '../../contexts/RequestContext';
import { GridItemConstrainedMedium } from '../../lib/styledGrid';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '../../models/propTypes';

const StyledContainer = styled.div`
  padding-top: ${({ orientation }) =>
    orientation === 'Portrait' ? '177.78%' : '56.25%'};
  position: relative;
  overflow: hidden;
`;

const MediaPlayerContainer = ({ blocks }) => {
  const { env, id, platform } = React.useContext(RequestContext);
  const { enabled } = useToggle('mediaPlayer');

  if (!enabled || !blocks) {
    return null;
  }

  const aresMediaBlock = filterForBlockType(blocks, 'aresMedia');

  if (!aresMediaBlock) {
    return null;
  }

  const nestedModel = pathOr(
    null,
    ['model', 'blocks', 0, 'model'],
    aresMediaBlock,
  );
  const versionId = pathOr(null, ['versions', 0, 'versionId'], nestedModel);
  const embedSource = embedUrl(env, id, versionId);

  return (
    <GridItemConstrainedMedium>
      <Metadata aresMediaBlock={aresMediaBlock} />
      <StyledContainer>
        <Canonical embedSource={embedSource} />
      </StyledContainer>
    </GridItemConstrainedMedium>
  );
};

MediaPlayerContainer.propTypes = mediaPlayerPropTypes;
MediaPlayerContainer.defaultProps = emptyBlockArrayDefaultProps;

export default MediaPlayerContainer;
