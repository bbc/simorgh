import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { GridItemMediumNoMargin } from '#components/Grid';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';
import {
  ARTICLE_PAGE,
  MEDIA_ARTICLE_PAGE,
  STORY_PAGE,
  CORRESPONDENT_STORY_PAGE,
} from '#app/routes/utils/pageTypes';
import MediaPlayerContainer from '../MediaPlayer';

const formatAssetId = assetUri => {
  if (assetUri && assetUri.includes('newyddion')) {
    return assetUri.replace('newyddion', 'cymrufyw');
  }

  return assetUri;
};

const pageTypeMap = {
  [ARTICLE_PAGE]: 'articles',
  [MEDIA_ARTICLE_PAGE]: 'articles',
  [STORY_PAGE]: 'cps',
  [CORRESPONDENT_STORY_PAGE]: 'cps',
};

const ArticleMediaPlayerContainer = ({ blocks }) => {
  const { id, isLite, pageType } = useContext(RequestContext);
  const hasPlaceholder = pageType !== MEDIA_ARTICLE_PAGE;

  if (isLite) return null;

  return (
    <GridItemMediumNoMargin>
      <MediaPlayerContainer
        blocks={blocks}
        assetId={formatAssetId(id)}
        assetType={pageTypeMap[pageType]}
        showPlaceholder={hasPlaceholder}
      />
    </GridItemMediumNoMargin>
  );
};

ArticleMediaPlayerContainer.propTypes = mediaPlayerPropTypes;
ArticleMediaPlayerContainer.defaultProps = {
  ...emptyBlockArrayDefaultProps,
};

export default ArticleMediaPlayerContainer;
