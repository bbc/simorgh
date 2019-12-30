import React from 'react';
import { shape, string, oneOf, number } from 'prop-types';
import styled from 'styled-components';
import { getFoolscap, getDoublePica } from '@bbc/gel-foundations/typography';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_0_SCREEN_WIDTH_MAX,
} from '@bbc/gel-foundations/breakpoints';
import { C_EBON, C_POSTBOX } from '@bbc/psammead-styles/colours';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { grid } from '@bbc/psammead-styles/detection';
import {
  getSerifLight,
  getSerifMedium,
} from '@bbc/psammead-styles/font-styles';
import { itemPropTypes, itemsPropTypes } from '../testHelpers/itemsHelper';

// This is to handle the padding between the rank and the link for both ltr and rtl stories.
const paddingStart = ({ dir }) => `padding-${dir === 'ltr' ? 'left' : 'right'}`;

// This is to make where the link ends consistent for both columns
const paddingEnd = ({ dir }) => `padding-${dir === 'ltr' ? 'right' : 'left'}`;

// For additional spacing for numerals in the right column because of '10' being double digits
const isOnSecondColumn = ({ listIndex, items }, supportsGrid) =>
  supportsGrid
    ? listIndex + 1 > Math.ceil(items.length / 2)
    : (listIndex + 1) % 2 === 0;

const listHasDoubleDigits = ({ items }) => items.length >= 9;

// This checks whether the 2nd column contains a double digit value
const columnIncludesDoubleDigits = (props, supportsGrid) =>
  isOnSecondColumn(props, supportsGrid) && listHasDoubleDigits(props);

// These default measurements are to be used for 2nd column minimum width.
const doubleDigitDefault = {
  group0: '2.5rem',
  group1: '2.5rem',
  group2: '2.5rem',
  group3: '4rem',
  group5: '4.25rem',
};

// These override measurements are for services with smaller characters and used for 2nd column minimum width.
const doubleDigitOverride = {
  group0: '2.5rem',
  group1: '2rem',
  group2: '2rem',
  group3: '3rem',
  group5: '3rem',
};

const doubleDigitWidth = ({ service }) => {
  const overrideService = ['bengali'];
  return overrideService.includes(service)
    ? doubleDigitOverride
    : doubleDigitDefault;
};

const StyledLink = styled.a`
  ${({ script }) => script && getDoublePica(script)};
  ${({ service }) => getSerifMedium(service)}

  color: ${C_EBON};
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const StyledWrapper = styled.div`
  @media (max-width: ${GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    min-width: ${props =>
      listHasDoubleDigits(props) ? doubleDigitWidth(props).group0 : 'auto'};
  }

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    min-width: ${props =>
      listHasDoubleDigits(props) ? doubleDigitWidth(props).group1 : 'auto'};
  }

  /* different number order for when css grid is not supported  */
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    min-width: ${props =>
      columnIncludesDoubleDigits(props, false)
        ? doubleDigitWidth(props).group2
        : 'auto'};
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    min-width: ${props =>
      columnIncludesDoubleDigits(props, false)
        ? doubleDigitWidth(props).group3
        : 'auto'};
  }

  @supports (${grid}) {
    @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
      min-width: ${props =>
        columnIncludesDoubleDigits(props, true)
          ? doubleDigitWidth(props).group2
          : 'auto'};
    }

    @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
      min-width: ${props =>
        columnIncludesDoubleDigits(props, true)
          ? doubleDigitWidth(props).group3
          : 'auto'};
    }
  }

  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    min-width: ${props =>
      props.listIndex === 4 && listHasDoubleDigits(props)
        ? doubleDigitWidth(props).group5
        : 'auto'};
  }
`;

const StyledItem = styled.div`
  padding-bottom: ${GEL_SPACING_TRPL};
  ${paddingStart}: ${GEL_SPACING_DBL};
  ${paddingEnd}: ${GEL_SPACING_DBL};

  @supports (${grid}) {
    ${paddingEnd}: 0;
  }
`;

export const MostReadRank = styled.span`
  ${({ service }) => getSerifLight(service)}
  ${({ script }) => script && getFoolscap(script)};
  color: ${C_POSTBOX};
  margin: 0; /* Reset */
  padding: 0;
  float: ${props => (props.dir === 'rtl' ? 'right' : 'left')};
`;

MostReadRank.propTypes = {
  service: string.isRequired,
  script: shape(scriptPropType).isRequired,
  dir: oneOf(['rtl', 'ltr']),
};

MostReadRank.defaultProps = {
  dir: 'ltr',
};

export const MostReadRankWrapper = ({
  service,
  script,
  rank,
  listIndex,
  items,
  dir,
}) => (
  <StyledWrapper
    listIndex={listIndex}
    service={service}
    items={items}
    dir={dir}
  >
    <MostReadRank service={service} script={script} dir={dir}>
      {rank}
    </MostReadRank>
  </StyledWrapper>
);

MostReadRankWrapper.propTypes = {
  service: string.isRequired,
  script: shape(scriptPropType).isRequired,
  rank: string,
  listIndex: number.isRequired,
  items: itemsPropTypes.isRequired,
  dir: oneOf(['rtl', 'ltr']),
};

MostReadRankWrapper.defaultProps = {
  rank: null,
  dir: 'ltr',
};

export const MostReadLink = ({ item, dir, service, script }) => (
  <StyledItem dir={dir}>
    <StyledLink href={item.href} script={script} service={service}>
      {item.title}
    </StyledLink>
    {item.timestamp}
  </StyledItem>
);

MostReadLink.propTypes = {
  dir: oneOf(['rtl', 'ltr']),
  item: itemPropTypes.isRequired,
  service: string.isRequired,
  script: shape(scriptPropType).isRequired,
};

MostReadLink.defaultProps = {
  dir: 'ltr',
};
