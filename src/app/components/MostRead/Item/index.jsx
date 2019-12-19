import React from 'react';
import { node, oneOf, shape, string } from 'prop-types';
import styled from 'styled-components';
import { getFoolscap, getDoublePica } from '@bbc/gel-foundations/typography';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_5_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import { C_EBON, C_POSTBOX } from '@bbc/psammead-styles/colours';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import {
  getSerifLight,
  getSerifMedium,
} from '@bbc/psammead-styles/font-styles';
import Grid from '@bbc/psammead-grid';

const paddingStart = ({ dir }) => `padding-${dir === 'ltr' ? 'left' : 'right'}`;

const StyledLink = styled.a`
  color: ${C_EBON};
  ${({ script }) => script && getDoublePica(script)};
  ${({ service }) => getSerifMedium(service)}
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const StyledItem = styled.div`
  padding-bottom: ${GEL_SPACING_TRPL};
  ${paddingStart}: ${GEL_SPACING_DBL};

  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    padding-top: ${GEL_SPACING};
    ${paddingStart}: ${GEL_SPACING_QUAD};
  }
`;

const StyledRank = styled.span`
  ${({ service }) => getSerifLight(service)}
  color: ${C_POSTBOX};
  ${({ script }) => script && getFoolscap(script)};
  margin: 0; /* Reset */
  padding: 0;
  display: inline-block;
  width: 3rem;
`;

const MostReadItemProps = {
  columns: {
    group0: 18,
    group1: 18,
    group2: 9,
    group3: 9,
    group4: 12,
    group5: 12,
  },
};

const MostReadRankProps = {
  columns: {
    group0: 2,
    group1: 2,
    group2: 2,
    group3: 2,
    group4: 2,
    group5: 2,
  },
  item: true,
};

const MostReadLinkProps = {
  item: true,
  columns: {
    group0: 16,
    group1: 16,
    group2: 7,
    group3: 7,
    group4: 10,
    group5: 10,
  },
};

export const MostReadItemWrapper = ({ dir, children }) => (
  <Grid {...MostReadItemProps} dir={dir} forwardedAs="li">
    {children}
  </Grid>
);

export const MostReadRank = ({ service, script, dir, rank }) => (
  <Grid {...MostReadRankProps} dir={dir}>
    <StyledRank service={service} script={script}>
      {rank}
    </StyledRank>
  </Grid>
);

export const MostReadLink = ({
  title,
  href,
  service,
  script,
  dir,
  children,
}) => (
  <Grid {...MostReadLinkProps} dir={dir}>
    <StyledItem dir={dir}>
      <StyledLink href={href} script={script} service={service}>
        {title}
      </StyledLink>
      <p>{children}</p>
    </StyledItem>
  </Grid>
);

MostReadItemWrapper.propTypes = {
  dir: oneOf(['rtl', 'ltr']),
  children: node.isRequired,
};

MostReadRank.propTypes = {
  service: string.isRequired,
  script: shape(scriptPropType).isRequired,
  rank: string.isRequired,
  dir: oneOf(['rtl', 'ltr']),
};

MostReadLink.propTypes = {
  title: string.isRequired,
  href: string.isRequired,
  children: node,
  service: string.isRequired,
  script: shape(scriptPropType).isRequired,
  dir: oneOf(['rtl', 'ltr']),
};

MostReadItemWrapper.defaultProps = {
  dir: 'ltr',
};

MostReadRank.defaultProps = {
  dir: 'ltr',
};

MostReadLink.defaultProps = {
  children: null,
  dir: 'ltr',
};
