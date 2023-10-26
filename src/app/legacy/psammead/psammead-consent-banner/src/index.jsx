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
import { scriptPropType } from '#psammead/gel-foundations/src/prop-types';
import {
  getDoublePica,
  getLongPrimer,
  getBodyCopy,
} from '#psammead/gel-foundations/src/typography';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '#psammead/gel-foundations/src/spacings';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { focusIndicatorThickness } from '../../../../components/ThemeProvider/focusIndicator';

// Transparent border is to show the top of the wrapper and button border in high-contrast mode
const transparentBorderHeight = '0.0625rem';

const hoverFocusStyles = ({ theme }) => `
  &:focus,
  &:hover {
    color: ${theme.palette.EBON};
    background-color: ${theme.palette.CONSENT_ACTION};
  }
`;

const Wrapper = styled.div`
  ${({ service }) => getSansRegular(service)}
  background-color: ${props => props.theme.palette.CONSENT_BACKGROUND};
  border-top: solid ${transparentBorderHeight} transparent;
`;

const CenterWrapper = styled.div`
  max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX};
  margin: 0 auto;

  a {
    color: ${props => props.theme.palette.CONSENT_ACTION};
    text-decoration: none;
    border-bottom: solid 0.0625rem ${props => props.theme.palette.PEBBLE};

    ${hoverFocusStyles}
  }

  a:hover,
  a:focus {
    border-bottom: solid 0.125rem transparent;
  }
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    padding: 2.75rem ${GEL_SPACING_DBL} ${GEL_SPACING} ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    padding: 2.75rem ${GEL_SPACING_DBL} ${GEL_SPACING} ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding: calc(${GEL_SPACING_QUAD} - ${transparentBorderHeight})
      ${GEL_SPACING_DBL} ${GEL_SPACING_QUAD} ${GEL_SPACING_DBL};
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
  color: ${props => props.theme.palette.WHITE};
  font-weight: 700;
  padding-top: 16px;
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
  color: ${props => props.theme.palette.CONSENT_ACTION};
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
  color: ${props => props.theme.palette.CONSENT_CONTENT};

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
    color: ${props => props.theme.palette.EBON};
    font-weight: bold;
    background-color: ${props => props.theme.palette.GHOST};
    border: solid ${transparentBorderHeight} transparent;
    margin: 0;
    cursor: pointer;

    &:hover,
    &:focus {
      text-decoration: underline;
    }

    /* Applies focus indicator black outline.
       Overrides dotted Mozilla focus ring applied by Normalize global styles. */
    &:focus-visible {
      outline: ${focusIndicatorThickness} solid
        ${props => props.theme.palette.BLACK};
    }

    ${hoverFocusStyles}
  }

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    width: 17.3125rem;
  }

  &.hide {
    width: 2.75rem;
    height: 2.75rem;
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    & button {
      width: 2.75rem;
      height: 2.75rem;
      cursor: pointer;
      background: none;
      border: none;
      &:hover:not(.focusIndicatorInset:focus-visible) {
        border: ${focusIndicatorThickness} solid
          ${props => props.theme.palette.WHITE};
      }
    }
    & svg {
      color: white;
      stroke: currentColor;
    }
  }
`;

export const ConsentBanner = ({
  dir,
  title,
  text,
  accept,
  reject,
  hide,
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
        <ListItem className="hide" dir={dir} script={script}>
          {hide && <div>{hide}</div>}
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
  hide: element.isRequired,
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
