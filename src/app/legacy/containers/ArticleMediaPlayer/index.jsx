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
  CSP: 'cps',
};

const ArticleMediaPlayerContainer = ({ blocks }) => {
  const { id, pageType } = useContext(RequestContext);

  return (
    <GridItemMediumNoMargin>
      <MediaPlayerContainer
        blocks={blocks}
        assetId={id}
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
