import React from 'react';
import { shape, string, oneOf, node } from 'prop-types';
import styled from '@emotion/styled';
import {
  getPica,
  getGreatPrimer,
} from '#psammead/gel-foundations/src/typography';
import { scriptPropType } from '#psammead/gel-foundations/src/prop-types';
import { grid } from '#psammead/psammead-styles/src/detection';
import { getSerifMedium } from '#psammead/psammead-styles/src/font-styles';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#psammead/gel-foundations/src/spacings';
import { GEL_GROUP_2_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';
import Grid from '#psammead/psammead-grid/src';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import {
  mostReadListGridProps,
  mostReadItemGridProps,
} from '../../utilities/gridProps';

export const getParentColumns = columnLayout => {
  if (columnLayout !== 'oneColumn') {
    return mostReadListGridProps(columnLayout).columns;
  }
  return null;
};

const StyledLink = styled.a`
  ${({ script }) => script && getPica(script)}
  ${({ service }) => getSerifMedium(service)}

  position: static;
  color: ${props => props.theme.palette.EBON};
  text-decoration: none;
  margin-bottom: ${GEL_SPACING};

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  &:before {
    bottom: 0;
    content: '';
    left: 0;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;
    white-space: nowrap;
    z-index: 1;
  }

  ${({ script, size }) =>
    script &&
    size !== 'small' &&
    `@media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
      ${getGreatPrimer(script)}
    }`}
`;

const getRankPaddingTop = size => (size === 'small' ? '0.2rem' : '0.375rem');
const getRankPaddingStart = size =>
  size === 'small' ? GEL_SPACING : GEL_SPACING_DBL;

const StyledItem = styled.div`
  padding-top: ${({ size }) => getRankPaddingTop(size)};

  ${({ dir, size }) =>
    dir === 'ltr'
      ? `padding-left: ${getRankPaddingStart(size)};`
      : `padding-right: ${getRankPaddingStart(size)};`}

  ${({ dir }) =>
    dir === 'ltr'
      ? `padding-right: ${GEL_SPACING_DBL};`
      : `padding-left: ${GEL_SPACING_DBL};`}

  @supports (${grid}) {
    ${({ dir }) => (dir === 'ltr' ? 'padding-right: 0;' : 'padding-left: 0;')}
  }
`;

const TimestampWrapper = styled.div`
  padding-top: ${GEL_SPACING};
`;

export const MostReadLink = ({
  dir,
  service,
  script,
  title,
  href,
  children,
  size,
  eventTrackingData,
}) => {
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);

  return (
    <StyledItem dir={dir} size={size}>
      <StyledLink
        href={href}
        script={script}
        service={service}
        size={size}
        onClick={clickTrackerHandler}
        className="focusIndicatorDisplayTableCell"
      >
        {title}
      </StyledLink>
      {children && <TimestampWrapper>{children}</TimestampWrapper>}
    </StyledItem>
  );
};

MostReadLink.propTypes = {
  dir: oneOf(['rtl', 'ltr']),
  service: string.isRequired,
  script: shape(scriptPropType).isRequired,
  title: string.isRequired,
  href: string.isRequired,
  children: node, // this node will be a timestamp container
  size: oneOf(['default', 'small']),
  eventTrackingData: shape({
    componentName: string,
  }),
};

MostReadLink.defaultProps = {
  dir: 'ltr',
  children: null,
  size: 'default',
  eventTrackingData: null,
};

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
`;

const StyledGrid = styled(Grid)`
  position: relative;
  padding-bottom: ${GEL_SPACING_TRPL};
`;

StyledGrid.defaultProps = {
  role: 'listitem',
};

export const MostReadItemWrapper = React.forwardRef(
  ({ dir, children, columnLayout }, ref) => (
    <StyledGrid
      {...mostReadItemGridProps(columnLayout)}
      parentColumns={getParentColumns(columnLayout)} // parentColumns is required here because on IE, this component would be rendered before it's parent therefore not receiving the parent's grid columns values so we have to explicitly pass it as a prop here so it works on IE
      dir={dir}
      as="li"
      ref={ref}
    >
      <ItemWrapper>{children}</ItemWrapper>
    </StyledGrid>
  ),
);

MostReadItemWrapper.propTypes = {
  children: node.isRequired,
  dir: oneOf(['rtl', 'ltr']),
  columnLayout: oneOf(['oneColumn', 'twoColumn', 'multiColumn']),
};

MostReadItemWrapper.defaultProps = {
  dir: 'ltr',
  columnLayout: 'multiColumn',
};
