import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { GridItemMediumNoMargin } from '#components/Grid';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';
import MediaPlayerContainer from '../MediaPlayer';

const formatAssetId = assetUri => {
  if (assetUri && assetUri.includes('newyddion')) {
    return assetUri.replace('newyddion', 'cymrufyw');
  }

  return assetUri;
};

const pageTypeMap = {
  article: 'articles',
  mediaArticle: 'articles',
  STY: 'cps',
  CSP: 'cps',
};

const ArticleMediaPlayerContainer = ({ blocks }) => {
  const { id, pageType } = useContext(RequestContext);
  const hasPlaceholder = pageType !== 'mediaArticle';

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
