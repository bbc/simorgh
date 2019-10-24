import React from 'react';
import { bool, string } from 'prop-types';
import styled from 'styled-components';
import { GridItemConstrainedLarge } from '#lib/styledGrid';

import MediaPlayer from '../../../MediaPlayer';

const CPSVideoBlock = ({ showPlaceholder, assetUri }) => {
  return props => (
    <MediaPlayer
      {...props}
      embedOverrides={{
        type: 'cps',
        id: assetUri.substr(1),
        showPlaceholder,
        wrapper: styled(GridItemConstrainedLarge)`
          padding-bottom: 1.5rem;
        `,
      }}
    />
  );
};

CPSVideoBlock.propTypes = {
  showPlaceholder: bool,
  assetUri: string.isRequired,
};

export default CPSVideoBlock;
