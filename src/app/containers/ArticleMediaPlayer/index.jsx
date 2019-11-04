import React, { useContext } from 'react';
import MediaPlayerContainer from '../MediaPlayer';
import { RequestContext } from '#contexts/RequestContext';
import Grid from '#app/components/Grid';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';

const ArticleMediaPlayerContainer = ({ blocks }) => {
  const { id } = useContext(RequestContext);

  return (
    <Grid
      item
      startOffset={{
        group0: 1,
        group1: 1,
        group2: 1,
        group3: 1,
        group4: 2,
        group5: 5,
      }}
      columns={{
        group0: 6,
        group1: 6,
        group2: 6,
        group3: 5,
        group4: 5,
        group5: 10,
      }}
    >
      <MediaPlayerContainer
        blocks={blocks}
        assetId={id}
        assetType="articles"
        showPlaceholder
      />
    </Grid>
  );
};

ArticleMediaPlayerContainer.propTypes = mediaPlayerPropTypes;
ArticleMediaPlayerContainer.defaultProps = {
  ...emptyBlockArrayDefaultProps,
};

export default ArticleMediaPlayerContainer;
