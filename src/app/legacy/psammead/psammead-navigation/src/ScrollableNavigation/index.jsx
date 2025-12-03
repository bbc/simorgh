import React from 'react';
import styled from '@emotion/styled';
import { GEL_SPACING_SEXT } from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
} from '#psammead/gel-foundations/src/breakpoints';
import { focusIndicatorThickness } from '../../../../../components/ThemeProvider/focusIndicator';

// Because IE11 can't handle 8-digit hex, need to convert to rgba
const hexToRGB = (hex, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const scrollableNavOutline = `
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  `;

const StyledScrollableNav = styled.div`
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    white-space: nowrap;
    overflow-x: scroll;

    /* Avoid using smooth scrolling as it causes accessibility issues */
    scroll-behavior: auto;
    -webkit-overflow-scrolling: touch;

    /* Hide scrollbar */
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }

    &:focus-visible {
      outline: none;
    }

    /* Change default focus indicator on Firefox to be inline with new focus indicator styling. */
    &:focus-visible::after {
      outline: ${focusIndicatorThickness} solid
        ${props => props.theme.palette.BLACK};
      ${scrollableNavOutline}
    }

    &:after {
      content: ' ';
      height: 100%;
      width: ${GEL_SPACING_SEXT};
      @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
        width: 6rem;
      }
      position: absolute;
      ${({ dir }) => `
        ${dir === 'ltr' ? 'right' : 'left'}: 0;
      `}
      bottom: 0;
      z-index: 3;
      overflow: hidden;
      pointer-events: none;
      background: linear-gradient(
        ${({ dir }) => (dir === 'ltr' ? 'to right' : 'to left')},
        ${props => hexToRGB(props.theme.palette.WHITE, 0)} 0%,
        ${props => hexToRGB(props.theme.palette.WHITE, 1)} 100%
      );
    }
  }
`;

export const ScrollableNavigation = ({ children, dir = 'ltr', ...props }) => (
  <StyledScrollableNav data-e2e="scrollable-nav" dir={dir} {...props}>
    {children}
  </StyledScrollableNav>
);

export default ScrollableNavigation;
