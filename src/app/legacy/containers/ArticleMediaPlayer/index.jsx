import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { GridItemMediumNoMargin } from '#components/Grid';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';
import MediaPlayerContainer from '../MediaPlayer';

const pageTypeMap = {
  article: 'articles',
  mediaArticle: 'articles',
  STY: 'cps',
};

const getCpsAssetUri = assetUri => {
  if (assetUri.includes('newyddion')) {
    return assetUri.replace('newyddion', 'cymrufyw');
  }

  return assetUri;
};

const ArticleMediaPlayerContainer = ({ blocks }) => {
  const { id, pathname, pageType, isCaf } = useContext(RequestContext);

  return (
    <GridItemMediumNoMargin>
      <MediaPlayerContainer
        blocks={blocks}
        assetId={isCaf ? getCpsAssetUri(pathname.substring(1)) : id}
        assetType={pageTypeMap[pageType]}
        showPlaceholder
      />
    </GridItemMediumNoMargin>
  );
};

ArticleMediaPlayerContainer.propTypes = mediaPlayerPropTypes;
ArticleMediaPlayerContainer.defaultProps = {
  ...emptyBlockArrayDefaultProps,
};

export default ArticleMediaPlayerContainer;
