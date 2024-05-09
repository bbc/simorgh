/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import styled from '@emotion/styled';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  MEDIA_QUERY_TYPOGRAPHY,
} from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import {
  getLongPrimer,
  getDoublePica,
} from '#psammead/gel-foundations/src/typography';
import { getSansBold } from '#psammead/psammead-styles/src/font-styles';
import { GHOST } from '#app/components/ThemeProvider/palette';

const minClickableHeightPx = 44;
const minClickableHeightRem = minClickableHeightPx / 16;

const paddingDir = ({ dir }) => `padding-${dir === 'rtl' ? 'left' : 'right'}`;
const paddingReverseDir = ({ dir }) =>
  `padding-${dir === 'rtl' ? 'right' : 'left'}`;

// Flex doesn't work right on IE11.
// This makes it work right. I don't fully understand how, but am
// eternally grateful to the Flexbugs project.
// https://github.com/philipwalton/flexbugs#flexbug-3
const FlexColumn = styled.span`
  display: flex;
  flex-direction: column;
`;

const SectionLabelLink = styled.a`
  color: ${props => props.theme.palette.EBON};
  text-decoration: none;

  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

const FlexRow = styled.span`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  min-height: ${minClickableHeightRem}rem;

  align-items: baseline;
  ${MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER} {
    align-items: stretch;
  }
`;

const titleMargins = `
  margin: ${GEL_SPACING_DBL} 0;

  ${MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER} {
    margin: 0;
  }
`;

const Title = styled.span`
  ${({ script }) => script && getDoublePica(script)};
  ${({ service }) => getSansBold(service)}
  background-color: ${({ backgroundColor, theme }) =>
    theme.isDarkUi ? theme.palette.GREY_10 : backgroundColor};
  color: ${({ theme }) => theme.isDarkUi && theme.palette.GREY_2};
  ${titleMargins};
  ${paddingDir}: ${GEL_SPACING};

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    ${paddingDir}: ${GEL_SPACING_DBL};
  }

  display: flex;
  align-items: center;
`;

const IndexLinkCta = styled.span`
  ${({ script }) => script && getLongPrimer(script)};
  ${({ service }) => getSansBold(service)};
  ${titleMargins};
  color: ${props => props.theme.palette.EBON};
  background-color: ${props => props.backgroundColor};
  white-space: nowrap;
  ${paddingReverseDir}: ${GEL_SPACING_DBL};

  /* needed to ensure always vertically centered even when FlexRow changes alignment */
  display: flex;
  align-items: center;
`;

export const PlainTitle = ({
  children: title,
  dir,
  labelId,
  script,
  service,
  backgroundColor = GHOST,
}) => (
  <FlexColumn>
    <FlexRow>
      <Title
        script={script}
        dir={dir}
        id={labelId}
        service={service}
        backgroundColor={backgroundColor}
      >
        {title}
      </Title>
    </FlexRow>
  </FlexColumn>
);

export const LinkTitle = ({
  children: title,
  dir,
  href,
  labelId,
  linkText,
  script,
  service,
  backgroundColor = GHOST,
}) => (
  <SectionLabelLink
    href={href}
    labelId={labelId}
    className="focusIndicatorDisplayBlock"
  >
    <FlexColumn>
      <FlexRow role="text">
        <Title
          id={labelId}
          dir={dir}
          script={script}
          service={service}
          backgroundColor={backgroundColor}
        >
          {title}
        </Title>
        <IndexLinkCta
          dir={dir}
          script={script}
          service={service}
          backgroundColor={backgroundColor}
          aria-hidden="true"
        >
          {linkText}
        </IndexLinkCta>
      </FlexRow>
    </FlexColumn>
  </SectionLabelLink>
);
