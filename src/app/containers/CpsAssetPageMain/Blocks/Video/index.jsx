import React from 'react';
import { bool, string } from 'prop-types';
import styled from 'styled-components';
import { GridItemConstrainedLarge } from '#lib/styledGrid';
import MediaPlayer from '../../../MediaPlayer';

const CPSVideoBlock = props => {
  const { showPlaceholder, assetUri } = props;
  return (
    <MediaPlayer
      {...props}
      embedOverrides={{
        type: 'cps',
        id: assetUri,
        showPlaceholder,
        wrapper: styled(GridItemConstrainedLarge)`
          padding-bottom: 1.5rem;
        `,
      }}
    />
  );
};

CPSVideoBlock.defaultProps = {
  showPlaceholder: true,
};

CPSVideoBlock.propTypes = {
  showPlaceholder: bool,
  assetUri: string.isRequired,
};

export default CPSVideoBlock;
