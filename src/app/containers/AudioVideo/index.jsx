import React from 'react';
import Helmet from 'react-helmet';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';

import deepGet from '../../lib/utilities/deepGet';
import Canonical from './Canonical';
import Caption from '../Caption';
import videoMetadata from './audioVideoMetadata';
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
  const nestedModel = deepGet(['model', 'blocks', 0, 'model'], aresMediaBlock);
  const pid = deepGet(['id'], nestedModel);
  const kind =
    deepGet(['format'], nestedModel) === 'audio_video' ? 'programme' : 'audio';

  const type = kind === 'audio' ? kind : 'video';

  const orientation = deepGet(['versions', 0, 'types', 0], nestedModel);

  const wrapperSpan = {
    default: '6',
    group5: '12',
  };
  let ParentWrapper = NestedGridParentLarge;
  let ChildWrapper = NestedGridItemChildLarge;
  let Container = GridItemConstrainedLargeNoMargin;
  let widthAndHeight = `
    height: 100%;
    width: 100%;
  `;

  if (orientation === 'Portrait') {
    ParentWrapper = NestedGridParentSmall;
    ChildWrapper = NestedGridItemChildSmall;
    Container = GridItemConstrainedSmall;
    wrapperSpan.default = '4';

    widthAndHeight = `
      @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
          height: calc(((100vw - 2rem) * 3/5 ) * 16/9);
          width: 100%;
      }
      @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
        height: calc(((100vw - (100vw - 1280px) + 2rem) * 8/20 ) * 16/9);
        width: 100%;
      }
    `;
  }

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
            <Canonical
              id={pid}
              blocks={blocks}
              widthAndHeight={widthAndHeight}
            />
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
