import React from 'react';
import { Helmet } from 'react-helmet';
import { bool, string, arrayOf, element, shape } from 'prop-types';
import styled from '@emotion/styled';
import { scriptPropType } from '#psammead/gel-foundations/src/prop-types';
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
  GEL_MARGIN_BELOW_400PX,
  GEL_MARGIN_ABOVE_400PX,
  GEL_SPACING_DBL,
  GEL_SPACING,
  GEL_SPACING_QUAD,
  GEL_SPACING_TRPL,
} from '#psammead/gel-foundations/src/spacings';

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
  max-height: ${BANNER_MAX_HEIGHT};
`;

const BannerPage = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-height: ${BANNER_MAX_HEIGHT};
  max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX};
  overflow-y: auto;
  padding-right: ${GEL_MARGIN_BELOW_400PX};
  padding-left: ${GEL_MARGIN_BELOW_400PX};

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding-left: ${GEL_MARGIN_ABOVE_400PX};
    padding-right: ${GEL_MARGIN_ABOVE_400PX};
  }
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
    color: ${props => props.theme.palette.CONSENT_ACTION};
  }
`;

/**
 * AmpCookieSettingsButton is a control that can be used externally to display
 * the Manage Cookie Settings banner.
 */
// eslint-disable-next-line react/prop-types
export const AmpCookieSettingsButton = ({ children, lang, className }) => (
  <button
    on="tap:consent.prompt, privacy.hide, cookie.show, AMP.setState({ isManagingSettings: true })"
    type="button"
    data-testid="amp-cookie-settings-button"
    lang={lang}
    className={className}
  >
    {children}
  </button>
);

const AmpCookieBanner = ({
  id,
  translations,
  accept,
  reject,
  hidden,
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
          <Title script={script} tabIndex="-1" id="dataCollectionHeading">
            {initial.title}
          </Title>
          <Paragraph script={script}>
            {initial.description.first}
            <StyledLink
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
                on="tap:AMP.setState({ isManagingSettings: true }), manageCookiesHeading.focus"
              >
                {initial.manage}
              </button>
            </OptionsItem>
          </OptionsList>
        </BannerPage>
        <BannerPage
          hidden
          data-amp-bind-hidden="!isManagingSettings"
          data-testid="amp-cookie-banner-manage-settings"
        >
          <Title script={script} tabIndex="-1" id="manageCookiesHeading">
            {manage.title}
          </Title>
          <Paragraph script={script}>{manage.description.para1}</Paragraph>
          <Paragraph script={script}>{manage.description.para2}</Paragraph>
          <Heading>{manage.description.heading2}</Heading>
          <Paragraph script={script}>{manage.description.para3}</Paragraph>
          <Paragraph script={script}>
            <StyledLink
              href={manage.description.para4.url}
              text={manage.description.para4.text}
            />
          </Paragraph>
          <Paragraph script={script}>{manage.description.para5}</Paragraph>
          <Heading>{manage.description.heading3}</Heading>
          <Paragraph script={script}>{manage.description.para6}</Paragraph>
          <Paragraph script={script}>
            <StyledLink
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
          </OptionsList>
        </BannerPage>
      </Wrapper>
    </div>
  );
};

Link.propTypes = {
  text: string.isRequired,
  href: string.isRequired,
  className: string.isRequired,
};

AmpCookieBanner.propTypes = {
  translations: arrayOf(shape({})).isRequired,
  accept: element.isRequired,
  reject: element.isRequired,
  id: string,
  hidden: bool,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
};

AmpCookieBanner.defaultProps = {
  id: null,
  hidden: null,
};

export default AmpCookieBanner;
