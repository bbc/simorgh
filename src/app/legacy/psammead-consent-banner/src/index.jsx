import React, { forwardRef } from 'react';
import {
  string,
  element,
  bool,
  oneOf,
  shape,
  func,
  oneOfType,
  any,
} from 'prop-types';
import styled from '@emotion/styled';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import {
  C_CONSENT_BACKGROUND,
  C_CONSENT_ACTION,
  C_CONSENT_CONTENT,
  C_WHITE,
  C_PEBBLE,
  C_EBON,
  C_GHOST,
} from '@bbc/psammead-styles/colours';
import {
  getDoublePica,
  getLongPrimer,
  getBodyCopy,
} from '@bbc/gel-foundations/typography';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';

// Transparent border is to show the top of the wrapper and button border in high-contrast mode
const transparentBorderHeight = '0.0625rem';

const hoverFocusStyles = `
  &:focus,
  &:hover {
    color: ${C_EBON};
    background-color: ${C_CONSENT_ACTION};
  }
`;

const Wrapper = styled.div`
  ${({ service }) => getSansRegular(service)}
  background-color: ${C_CONSENT_BACKGROUND};
  border-top: solid ${transparentBorderHeight} transparent;

  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    padding: calc(${GEL_SPACING_DBL} - ${transparentBorderHeight})
      ${GEL_SPACING} ${GEL_SPACING} ${GEL_SPACING};
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    padding: calc(${GEL_SPACING_DBL} - ${transparentBorderHeight})
      ${GEL_SPACING_DBL} ${GEL_SPACING} ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding: calc(${GEL_SPACING_QUAD} - ${transparentBorderHeight})
      ${GEL_SPACING_DBL} ${GEL_SPACING_QUAD} ${GEL_SPACING_DBL};
  }
`;

const CenterWrapper = styled.div`
  max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX};
  margin: 0 auto;

  a {
    color: ${C_CONSENT_ACTION};
    text-decoration: none;
    border-bottom: solid 0.0625rem ${C_PEBBLE};

    ${hoverFocusStyles}
  }

  a:hover,
  a:focus {
    border-bottom: solid 0.125rem transparent;
  }
`;

// eslint-disable-next-line react/prop-types
const FocusableH2 = forwardRef(({ className, children, dir }, ref) => {
  // tabIndex="-1" enables the h2 to be focussed
  return (
    <h2 className={className} dir={dir} tabIndex="-1" ref={ref}>
      {children}
    </h2>
  );
});

const Title = styled(FocusableH2)`
  ${({ script }) => script && getDoublePica(script)};
  color: ${C_WHITE};
  font-weight: 700;
  padding: 0;
  margin: 0;

  &:focus {
    outline: none;
  }
`;

/*
 * The '& li + li' below allows for styling every `li` element except the first.
 */
const Options = styled.ul`
  ${({ script }) => script && getLongPrimer(script)};
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${C_CONSENT_ACTION};
  font-weight: 600;
  padding: 0;
  margin: 0;
  list-style-type: none;

  & li + li {
    margin-top: ${GEL_SPACING};
    padding-top: ${GEL_SPACING_DBL};
    padding-bottom: ${GEL_SPACING_DBL};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    flex-direction: row;
    justify-content: space-between;

    & li + li {
      margin-top: 0;
    }
  }
`;

export const ConsentBannerText = styled.p`
  ${({ script }) => script && getBodyCopy(script)};
  margin-top: ${GEL_SPACING_DBL};
  margin-bottom: ${GEL_SPACING_TRPL};
  color: ${C_CONSENT_CONTENT};

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_TRPL};
  }
`;

// Style `button` and `a` as children due to inability to set `on`
// prop on styled component as required for the amp useage
const ListItem = styled.li`
  text-align: center;
  width: 100%;
  word-break: break-word;
  & button {
    ${({ script }) => script && getLongPrimer(script)};
    width: 100%;
    min-height: 2.75rem;
    color: ${C_EBON};
    font-weight: bold;
    background-color: ${C_GHOST};
    border: solid ${transparentBorderHeight} transparent;
    margin: 0;
    cursor: pointer;

    &:hover,
    &:focus {
      text-decoration: underline;
    }

    ${hoverFocusStyles}
  }

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    width: 17.3125rem;
  }
`;

export const ConsentBanner = ({
  dir,
  title,
  text,
  accept,
  reject,
  id,
  hidden,
  script,
  service,
  headingRef,
}) => (
  <Wrapper dir={dir} hidden={hidden} id={id} service={service}>
    <CenterWrapper dir={dir}>
      <Title dir={dir} script={script} ref={headingRef}>
        {title}
      </Title>
      {text}
      <Options dir={dir} script={script} role="list">
        <ListItem dir={dir} script={script}>
          {accept}
        </ListItem>
        <ListItem dir={dir} script={script}>
          <span>{reject}</span>
        </ListItem>
      </Options>
    </CenterWrapper>
  </Wrapper>
);

ConsentBanner.propTypes = {
  dir: oneOf(['ltr', 'rtl']),
  title: string.isRequired,
  text: element.isRequired,
  accept: element.isRequired,
  reject: element.isRequired,
  id: string,
  hidden: bool,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  headingRef: oneOfType([func, shape({ current: any })]),
};

ConsentBanner.defaultProps = {
  dir: 'ltr',
  id: null,
  hidden: null,
  headingRef: null,
};
