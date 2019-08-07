import React from 'react';
import Helmet from 'react-helmet';
import pathOr from 'ramda/src/pathOr';
import styled from 'styled-components';
import Canonical from './Canonical';
import videoMetadata from './metadata';
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
  const { id, platform } = React.useContext(RequestContext);
  const { enabled } = useToggle('mediaPlayer');

  if (!enabled || !blocks) {
    return null;
  }

  const aresMediaBlock = filterForBlockType(blocks, 'aresMedia');

  if (!aresMediaBlock) {
    return null;
  }

  const metadata = videoMetadata(aresMediaBlock);
  const nestedModel = pathOr(
    null,
    ['model', 'blocks', 0, 'model'],
    aresMediaBlock,
  );

  const versionId = pathOr(null, ['versions', 0, 'versionId'], nestedModel);
  const embedSource = embedUrl('local', id, versionId);

  return (
    <GridItemConstrainedMedium>
      {metadata ? (
        <Helmet>
          {
            <script type="application/ld+json">
              {JSON.stringify(metadata)}
            </script>
          }
        </Helmet>
      ) : null}
      <StyledContainer>
        <Canonical embedSource={embedSource} />
      </StyledContainer>
    </GridItemConstrainedMedium>
  );
};

MediaPlayerContainer.propTypes = mediaPlayerPropTypes;

MediaPlayerContainer.defaultProps = emptyBlockArrayDefaultProps;

export default MediaPlayerContainer;
