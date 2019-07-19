import React from 'react';
import Helmet from 'react-helmet';
import pathOr from 'ramda/src/pathOr';
import Canonical from './Canonical';
import Caption from '../Caption';
import videoMetadata from './metadata';
import {
  NestedGridParentLarge,
  NestedGridParentSmall,
  NestedGridItemChildSmall,
  NestedGridItemChildLarge,
  GridItemConstrainedLargeNoMargin,
  GridItemConstrainedSmall,
} from '../../lib/styledGrid';

import {
  audioVideoPropTypes,
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
  let portrait = false;

  if (orientation === 'Portrait') {
    ParentWrapper = NestedGridParentSmall;
    ChildWrapper = NestedGridItemChildSmall;
    Container = GridItemConstrainedSmall;
    wrapperSpan.default = '4';
    portrait = true;
  }

  return { ParentWrapper, ChildWrapper, Container, wrapperSpan, portrait };
};

const AudioVideoContainer = ({ blocks }) => {
  const { platform } = React.useContext(RequestContext);

  if (!blocks) {
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
  const pid = pathOr(null, ['id'], nestedModel);
  const kind =
    pathOr(null, ['format'], nestedModel) === 'audio_video'
      ? 'programme'
      : 'audio';

  const type = kind === 'audio' ? kind : 'video';

  const orientation = pathOr(null, ['versions', 0, 'types', 0], nestedModel);

  const {
    ParentWrapper,
    ChildWrapper,
    Container,
    wrapperSpan,
    portrait,
  } = selectWrappers(orientation);

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
          {platform === 'canonical' ? (
            <Canonical id={pid} blocks={blocks} portrait={portrait} />
          ) : null}
        </ChildWrapper>
        <ChildWrapper
          gridColumnStart={1}
          gridSpan={{
            default: '6',
            group3: '5',
            group4: '5',
            group5: '10',
          }}
        >
          {captionBlock ? <Caption block={captionBlock} type={type} /> : null}
        </ChildWrapper>
      </ParentWrapper>
    </Container>
  );
};

AudioVideoContainer.propTypes = audioVideoPropTypes;

AudioVideoContainer.defaultProps = emptyBlockArrayDefaultProps;

export default AudioVideoContainer;
