import React, { useContext } from 'react';
import MediaPlayerContainer from '../MediaPlayer';
import { RequestContext } from '#contexts/RequestContext';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';

const ArticleMediaPlayerContainer = ({ blocks }) => {
  const { id, pageType } = useContext(RequestContext);
  const showPlaceholder = true;

  return (
    <GridItemConstrainedMedium>
      <MediaPlayerContainer
        block={blocks}
        assetId={id}
        assetType={pageType}
        showPlaceholder={showPlaceholder}
      />
    </GridItemConstrainedMedium>
  );
};

ArticleMediaPlayerContainer.propTypes = mediaPlayerPropTypes;
ArticleMediaPlayerContainer.defaultProps = {
  ...emptyBlockArrayDefaultProps,
};

export default ArticleMediaPlayerContainer;
