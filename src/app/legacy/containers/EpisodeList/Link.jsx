/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import styled from '@emotion/styled';
import MediaIndicator from './MediaIndicator';
import { withEpisodeContext } from './helpers';

const MediaIndicatorWrapper = styled.div`
  position: absolute;
  ${({ dir }) => `${dir === 'ltr' ? 'left' : 'right'}: 0.5rem;`}
  top: 0;
`;

// `display: block` has been used to resolve Focus Indicator bug in Firefox high contrast mode.
const StyledAnchor = styled.a`
  display: block;

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
      color: ${props => props.theme.palette.POSTBOX};
    }
    .rounded-play-button__triangle {
      fill: transparent;
    }
  }
  &:visited {
    [class*='--visited'] {
      color: ${({ theme }) =>
        theme.isDarkUi ? theme.palette.STONE : theme.palette.METAL};
    }
  }
`;

const Link = ({
  children,
  showMediaIndicator = false,
  dir,
  index,
  ...props
}) => {
  return (
    <StyledAnchor
      showMediaIndicator={showMediaIndicator}
      // This is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
      aria-labelledby={`episodeLinkIndex-${index}`}
      className="focusIndicatorDisplayBlock focusIndicatorInvert"
      {...props}
    >
      {showMediaIndicator && (
        <MediaIndicatorWrapper dir={dir} aria-hidden="true">
          <MediaIndicator size="2.5rem" />
        </MediaIndicatorWrapper>
      )}
      <span
        role="text"
        id={`episodeLinkIndex-${index}`} // ID is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
      >
        {children}
      </span>
    </StyledAnchor>
  );
};

export default withEpisodeContext(Link);
