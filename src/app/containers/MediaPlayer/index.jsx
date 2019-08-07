import React from 'react';
import Helmet from 'react-helmet';
import pathOr from 'ramda/src/pathOr';
import styled from 'styled-components';
import Caption from '../Caption';
import Canonical from './Canonical';
import videoMetadata from './metadata';
import mediaPlayerWrappers from './helpers/wrappers';

import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '../../models/propTypes';
import filterForBlockType from '../../lib/utilities/blockHandlers';
import { RequestContext } from '../../contexts/RequestContext';
import useToggle from '../Toggle/useToggle';

const StyledContainer = styled.div`
  padding-top: ${({ orientation }) =>
    orientation === 'Portrait' ? '177.78%' : '56.25%'};
  position: relative;
  overflow: hidden;
`;

const MediaPlayerContainer = ({ blocks }) => {
  const { platform } = React.useContext(RequestContext);
  const { enabled } = useToggle('mediaPlayer');

  if (!enabled || !blocks) {
    return null;
  }

  const aresMediaBlock = filterForBlockType(blocks, 'aresMedia');

  if (!aresMediaBlock) {
    return null;
  }

  const metadata = videoMetadata(aresMediaBlock);
  const captionBlock = filterForBlockType(blocks, 'caption');
  const nestedModel = pathOr(
    null,
    ['model', 'blocks', 0, 'model'],
    aresMediaBlock,
  );

  const orientation = pathOr(null, ['versions', 0, 'types', 0], nestedModel);
  const versionId = pathOr(null, ['versions', 0, 'versionId'], nestedModel);

  const {
    ParentWrapper,
    ChildWrapper,
    Container,
    wrapperSpan,
  } = mediaPlayerWrappers(orientation);

  return (
    <Container>
      {metadata ? (
        <Helmet>
          {
            <script type="application/ld+json">
              {JSON.stringify(metadata)}
            </script>
          }
        </Helmet>
      ) : null}
      <ParentWrapper>
        <ChildWrapper gridColumnStart={1} gridSpan={wrapperSpan}>
          <StyledContainer>
            <Canonical vpid={versionId} />
          </StyledContainer>
        </ChildWrapper>
      </ParentWrapper>
    </Container>
  );
};

MediaPlayerContainer.propTypes = mediaPlayerPropTypes;

MediaPlayerContainer.defaultProps = emptyBlockArrayDefaultProps;

export default MediaPlayerContainer;
