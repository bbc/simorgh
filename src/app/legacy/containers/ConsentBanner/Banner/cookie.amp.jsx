import React from 'react';
import { Helmet } from 'react-helmet';
import styled from '@emotion/styled';
import {
  getDoublePica,
  getLongPrimer,
  getBodyCopy,
} from '#psammead/gel-foundations/src/typography';
import {
  getSansBold,
  getSansRegular,
} from '#psammead/psammead-styles/src/font-styles';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_MARGIN_ABOVE_400PX,
  GEL_SPACING_DBL,
  GEL_SPACING,
  GEL_SPACING_QUAD,
  GEL_SPACING_TRPL,
} from '#psammead/gel-foundations/src/spacings';
import useToggle from '#hooks/useToggle';
import { focusIndicatorThickness } from '../../../../components/ThemeProvider/focusIndicator';

const BANNER_MAX_HEIGHT = '75vh';
const MIN_TAP_HEIGHT = '2.75rem'; // 44px
const OPTIONS_MAX_WIDTH = '23.875rem'; // 382px
const BORDER_WIDTH = '0.0625rem'; // 1px
const BORDER_WIDTH_TRANSPARENT = '0.125rem'; // 2px

const COMMON_HEADING_STYLES = `
  margin-top: ${GEL_SPACING_DBL};
  margin-bottom: 0;

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_QUAD};
  }

  &:focus {
    outline: none;
  }
`;

const Wrapper = styled.div`
  ${({ service }) => getSansRegular(service)}
  background-color: ${props => props.theme.palette.CONSENT_BACKGROUND};
  border: ${BORDER_WIDTH_TRANSPARENT} solid transparent;
`;

const BannerPage = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  ${({ script }) => getDoublePica(script)}
  color: ${props => props.theme.palette.WHITE};
  ${COMMON_HEADING_STYLES}
`;

const Heading = styled.h3`
  color: ${props => props.theme.palette.WHITE};
  ${COMMON_HEADING_STYLES}
`;

const Paragraph = styled.p`
  ${({ script }) => getBodyCopy(script)}
  color: ${props => props.theme.palette.CONSENT_CONTENT};
  margin-top: ${GEL_SPACING_DBL};
  margin-bottom: ${GEL_SPACING_DBL};
`;

const Link = ({ text, href, className }) => (
  <a href={href} className={className}>
    <span>{text}</span>
  </a>
);

const StyledLink = styled(Link)`
  color: ${props => props.theme.palette.CONSENT_ACTION};
  text-decoration: none;

  span {
    border-bottom: ${props => props.theme.palette.PEBBLE} solid ${BORDER_WIDTH};
  }

  &:hover,
  &:focus {
    background-color: ${props => props.theme.palette.CONSENT_ACTION};
    color: ${props => props.theme.palette.EBON};

    span {
      border-bottom: transparent solid ${BORDER_WIDTH_TRANSPARENT};
    }
  }
`;

const OptionsList = styled.ul`
  ${({ script }) => getLongPrimer(script)}
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0 auto;
  max-width: ${OPTIONS_MAX_WIDTH};
  padding-right: 0;
  padding-bottom: ${GEL_SPACING_DBL};
  padding-left: 0;

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    max-width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: ${GEL_SPACING_TRPL};
  }
`;

/* Custom hover and focus indicator styling applied to pseudo-element. Global focus indicator styling has been removed. */
const a11yOutlinePosition = `
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const OptionsItem = styled.li`
  margin-bottom: ${GEL_SPACING};

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    width: calc(50% - ${GEL_SPACING});
  }

  button {
    ${({ service }) => getSansBold(service)}
    ${({ script }) => getLongPrimer(script)}
    background: ${props => props.theme.palette.GHOST};
    border: none;
    color: ${props => props.theme.palette.EBON};
    cursor: pointer;
    display: block;
    height: 100%;
    min-height: ${MIN_TAP_HEIGHT};
    padding: ${GEL_SPACING};
    width: 100%;
    &:focus-visible {
      outline: ${focusIndicatorThickness} solid
        ${props => props.theme.palette.BLACK};
    }
    &:hover,
    &:focus {
      background-color: ${props => props.theme.palette.CONSENT_ACTION};
      color: ${props => props.theme.palette.EBON};
      text-decoration: underline;
    }
  }

  button[on='tap:AMP.setState({ isManagingSettings: true })'] {
    background: none;
    border: ${BORDER_WIDTH} solid ${props => props.theme.palette.CONSENT_ACTION};
    border: ${BORDER_WIDTH} solid ${props => props.theme.palette.CONSENT_ACTION};
    color: ${props => props.theme.palette.CONSENT_ACTION};
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
      &:focus::after,
      &:hover::after {
        ${a11yOutlinePosition}
        border: ${focusIndicatorThickness} solid
          ${props => props.theme.palette.WHITE};
      }
      &:focus-visible::after {
        ${a11yOutlinePosition}
        border: ${focusIndicatorThickness} solid
          ${props => props.theme.palette.BLACK};
        box-shadow: 0 0 0 ${focusIndicatorThickness}
          ${props => props.theme.palette.WHITE} inset;
      }
    }
    & svg {
      color: white;
      fill: currentColor;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
`;

const ContentWrapper = styled.div`
  align-self: center;
  max-height: ${BANNER_MAX_HEIGHT};
  max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX};
  overflow-y: auto;
  padding: 2.75rem ${GEL_SPACING_DBL} ${GEL_SPACING} ${GEL_SPACING_DBL};
  outline: none;
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding-left: ${GEL_MARGIN_ABOVE_400PX};
    padding-right: ${GEL_MARGIN_ABOVE_400PX};
  }
  &:focus-visible::after {
    ${a11yOutlinePosition}
    margin: auto;
    max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX};
    border: ${focusIndicatorThickness} solid
      ${props => props.theme.palette.BLACK};
    box-shadow: 0 0 0 ${focusIndicatorThickness}
      ${props => props.theme.palette.WHITE} inset;
    outline: none;
  }
`;

/**
 * AmpCookieSettingsButton is a control that can be used externally to display
 * the Manage Cookie Settings banner.
 */

export const AmpCookieSettingsButton = ({ children, lang, className }) => {
  const { enabled } = useToggle('privacyPolicy');
  const on = `tap:consent.prompt, ${enabled ? 'privacy.hide, ' : ''}cookie.show, AMP.setState({ isManagingSettings: true })`;

  return (
    <button
      // eslint-disable-next-line react/no-unknown-property
      on={on}
      type="button"
      data-testid="amp-cookie-settings-button"
      lang={lang}
      className={className}
    >
      {children}
    </button>
  );
};

const AmpCookieBanner = ({
  id = null,
  translations,
  accept,
  reject,
  hide,
  hidden = null,
  script,
  service,
}) => {
  const [initial, manage] = translations;

  return (
    <div id={id} hidden={hidden}>
      <Helmet>
        <script
          async
          custom-element="amp-bind"
          src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
        />
      </Helmet>
      <Wrapper service={service}>
        <BannerPage
          data-amp-bind-hidden="isManagingSettings"
          data-testid="amp-cookie-banner"
        >
          <ContentWrapper>
            <Title script={script} tabIndex="-1" id="dataCollectionHeading">
              {initial.title}
            </Title>
            <Paragraph script={script}>
              {initial.description.first}
              <StyledLink
                className="focusIndicatorReducedWidth"
                href={initial.description.linkUrl}
                text={initial.description.linkText}
              />
              {initial.description.last}
            </Paragraph>
            <OptionsList script={script} role="list">
              <OptionsItem script={script} service={service}>
                {accept}
              </OptionsItem>
              <OptionsItem script={script} service={service}>
                <button
                  type="button"
                  // eslint-disable-next-line react/no-unknown-property
                  on="tap:AMP.setState({ isManagingSettings: true }), manageCookiesHeading.focus"
                >
                  {initial.manage}
                </button>
              </OptionsItem>
              <OptionsItem className="hide" script={script} service={service}>
                <div>{hide}</div>
              </OptionsItem>
            </OptionsList>
          </ContentWrapper>
        </BannerPage>
        <BannerPage
          hidden
          data-amp-bind-hidden="!isManagingSettings"
          data-testid="amp-cookie-banner-manage-settings"
        >
          <ContentWrapper>
            <Title script={script} tabIndex="-1" id="manageCookiesHeading">
              {manage.title}
            </Title>
            <Paragraph script={script}>{manage.description.para1}</Paragraph>
            <Paragraph script={script}>{manage.description.para2}</Paragraph>
            <Heading>{manage.description.heading2}</Heading>
            <Paragraph script={script}>{manage.description.para3}</Paragraph>
            <Paragraph script={script}>
              <StyledLink
                className="focusIndicatorReducedWidth"
                href={manage.description.para4.url}
                text={manage.description.para4.text}
              />
            </Paragraph>
            <Paragraph script={script}>{manage.description.para5}</Paragraph>
            <Heading>{manage.description.heading3}</Heading>
            <Paragraph script={script}>{manage.description.para6}</Paragraph>
            <Paragraph script={script}>
              <StyledLink
                className="focusIndicatorReducedWidth"
                href={manage.description.para7.url}
                text={manage.description.para7.text}
              />
            </Paragraph>
            <Paragraph script={script}>{manage.description.para8}</Paragraph>
            <Paragraph script={script}>{manage.description.para9}</Paragraph>
            <OptionsList script={script} role="list">
              <OptionsItem script={script} service={service}>
                {accept}
              </OptionsItem>
              <OptionsItem script={script} service={service}>
                {reject}
              </OptionsItem>
              <OptionsItem className="hide" script={script} service={service}>
                <div>{hide}</div>
              </OptionsItem>
            </OptionsList>
          </ContentWrapper>
        </BannerPage>
      </Wrapper>
    </div>
  );
};

export default AmpCookieBanner;
