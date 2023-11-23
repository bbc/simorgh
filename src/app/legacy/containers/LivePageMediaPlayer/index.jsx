import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { RequestContext } from '#contexts/RequestContext';
import { GridItemMediumNoMargin } from '#components/Grid';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';
import MediaPlayerContainer from '../MediaPlayer';

const Wrapper = styled(GridItemMediumNoMargin)``;

const LivePageMediaPlayer = ({ blocks, className }) => {
  const { id } = useContext(RequestContext);

  return (
    <Wrapper className={className}>
      <MediaPlayerContainer
        blocks={blocks}
        assetId={id}
        assetType="live"
        showPlaceholder
      />
    </Wrapper>
  );
};

LivePageMediaPlayer.propTypes = mediaPlayerPropTypes;
LivePageMediaPlayer.defaultProps = {
  ...emptyBlockArrayDefaultProps,
};

export default LivePageMediaPlayer;
