import React, { Children, cloneElement } from 'react';
import styled from '@emotion/styled';
import { node, string } from 'prop-types';
import { GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import tail from 'ramda/src/tail';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import pathOr from 'ramda/src/pathOr';
import Image from './Image';
import { withEpisodeContext } from './helpers';

const Wrapper = styled.div`
  position: relative;
  ${({ showMediaIndicator, dir }) =>
    showMediaIndicator && `padding-${dir === 'ltr' ? 'left' : 'right'}: 4rem;`}
`;

const TextWrapper = styled.div`
  display: inline-block;
  max-width: calc(100% - 4.375rem - ${GEL_SPACING_DBL});
  vertical-align: top;
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    max-width: calc(100% - 7.5rem - ${GEL_SPACING_DBL});
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    max-width: calc(100% - 14.375rem - ${GEL_SPACING_DBL});
  }
`;

const Episode = ({ children, dir }) => {
  const showMediaIndicator = pathOr({}, '0', children).type !== Image;

  return (
    <Wrapper dir={dir} showMediaIndicator={showMediaIndicator}>
      {showMediaIndicator ? (
        Children.toArray(children)
          .filter(Boolean)
          .map(child => cloneElement(child, { showMediaIndicator }))
      ) : (
        <>
          {cloneElement(children[0], { dir })}
          <TextWrapper>{tail(children)}</TextWrapper>
        </>
      )}
    </Wrapper>
  );
};

Episode.propTypes = {
  children: node.isRequired,
  dir: string.isRequired,
};

export default withEpisodeContext(Episode);
