import React, { useContext } from 'react';
import MediaPlayerContainer from '../MediaPlayer';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { GridItemMediumNoMargin } from '#app/components/Grid';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';

const ArticleMediaPlayerContainer = ({ blocks }) => {
  const { id } = useContext(RequestContext);
  const { dir } = useContext(ServiceContext);

  return (
    <GridItemMediumNoMargin dir={dir}>
      <MediaPlayerContainer
        blocks={blocks}
        assetId={id}
        assetType="articles"
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
