/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import { node, string, bool } from 'prop-types';
import styled from '@emotion/styled';
import { C_METAL, C_POSTBOX, C_STONE } from '@bbc/psammead-styles/colours';
import MediaIndicator from './MediaIndicator';
import { withEpisodeContext } from './helpers';

const MediaIndicatorWrapper = styled.div`
  position: absolute;
  ${({ dir }) => `${dir === 'ltr' ? 'left' : 'right'}: 0.5rem;`}
  top: 0;
`;

const StyledAnchor = styled.a`
  :before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    content: '';
    overflow: hidden;
    z-index: 1;
  }
  line-height: 0;
  text-decoration: none;
  .rounded-play-button__ring,
  .rounded-play-button__triangle {
    color: #000;
  }

  &:focus,
  &:hover {
    [class*='--hover'] {
      text-decoration: underline;
    }
    .rounded-play-button__ring,
    .rounded-play-button__inner {
      fill: currentColor;
      color: ${C_POSTBOX};
    }
    .rounded-play-button__triangle {
      fill: transparent;
    }
  }
  &:visited {
    [class*='--visited'] {
      color: ${({ darkMode }) => (darkMode ? C_STONE : C_METAL)};
    }
  }
`;

const Link = ({ children, showMediaIndicator, dir, ...props }) => {
  return (
    <StyledAnchor showMediaIndicator={showMediaIndicator} {...props}>
      {showMediaIndicator && (
        <MediaIndicatorWrapper dir={dir}>
          <MediaIndicator size="2.5rem" />
        </MediaIndicatorWrapper>
      )}
      <span role="text">{children}</span>
    </StyledAnchor>
  );
};

Link.propTypes = {
  children: node.isRequired,
  dir: string.isRequired,
  showMediaIndicator: bool,
};

Link.defaultProps = {
  showMediaIndicator: false,
};

export default withEpisodeContext(Link);
