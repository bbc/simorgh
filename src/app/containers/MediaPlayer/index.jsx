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
  const isAmp = platform === 'amp';

  if (!enabled || !blocks) {
    return null;
  }

  const aresMediaBlock = filterForBlockType(blocks, 'aresMedia');

  if (!aresMediaBlock) {
    return null;
  }

  const versionId = pathOr(
    null,
    ['model', 'blocks', 0, 'model', 'versions', 0, 'versionId'],
    aresMediaBlock,
  );

  if (!versionId) {
    return null; // this should be the holding image with an error overlay
  }

  const embedSource = embedUrl(env, id, versionId, isAmp);

  return (
    <GridItemConstrainedMedium>
      <Metadata aresMediaBlock={aresMediaBlock} />
      <StyledContainer>
        {isAmp ? (
          <React.Fragment>{embedSource}</React.Fragment>
        ) : (
          <Canonical embedSource={embedSource} />
        )}
      </StyledContainer>
    </GridItemConstrainedMedium>
  );
};

MediaPlayerContainer.propTypes = mediaPlayerPropTypes;
MediaPlayerContainer.defaultProps = emptyBlockArrayDefaultProps;

export default MediaPlayerContainer;
