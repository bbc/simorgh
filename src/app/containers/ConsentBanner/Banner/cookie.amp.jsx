/* eslint-disable react/no-danger */
import React from 'react';
import { Helmet } from 'react-helmet';
import { bool, string, arrayOf, element, oneOf, shape } from 'prop-types';
import styled from '@emotion/styled';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import {
  C_CONSENT_BACKGROUND,
  C_CONSENT_ACTION,
  C_PEBBLE,
  C_CONSENT_CONTENT,
  C_METAL,
  C_WHITE,
  C_EBON,
  C_GHOST,
} from '@bbc/psammead-styles/colours';
import {
  getDoublePica,
  getLongPrimer,
  getBodyCopy,
} from '@bbc/gel-foundations/typography';
import { getSansBold, getSansRegular } from '@bbc/psammead-styles/font-styles';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_MARGIN_BELOW_400PX,
  GEL_MARGIN_ABOVE_400PX,
  GEL_SPACING_DBL,
  GEL_SPACING,
} from '@bbc/gel-foundations/spacings';

const MIN_TAP_HEIGHT = '2.75rem';

const COMMON_HEADING_STYLES = `
  color: ${C_WHITE};
  margin-top: 0;
  margin-bottom: 0;
`;

const Wrapper = styled.div`
  ${({ service }) => getSansRegular(service)}
  background-color: ${C_CONSENT_BACKGROUND};
  max-height: 100vh;
  padding-left: ${GEL_MARGIN_BELOW_400PX};
  padding-right: ${GEL_MARGIN_BELOW_400PX};

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding-left: ${GEL_MARGIN_ABOVE_400PX};
    padding-right: ${GEL_MARGIN_ABOVE_400PX};
  }
`;

const BannerPage = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  max-height: 100vh;
  max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX};

  a {
    color: ${C_CONSENT_ACTION};
    text-decoration: underline;
    text-decoration-color: ${C_PEBBLE};
  }
`;

const Title = styled.h2`
  ${({ script }) => getDoublePica(script)}
  ${COMMON_HEADING_STYLES}
  padding-top: ${GEL_SPACING_DBL};
  padding-bottom: ${GEL_SPACING_DBL};
`;

const ScrollBox = styled.div`
  border-top: 0.0625rem solid ${C_METAL};
  overflow-y: auto;
`;

const Heading = styled.h3`
  ${COMMON_HEADING_STYLES}
`;

const Paragraph = styled.p`
  ${({ script }) => script && getBodyCopy(script)}
  color: ${C_CONSENT_CONTENT};
  margin-top: ${GEL_SPACING_DBL};
  margin-bottom: ${GEL_SPACING_DBL};
`;

const OptionsList = styled.ul`
  ${({ script }) => getLongPrimer(script)}
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  list-style: none;
  margin-top: 0;
  margin-bottom: 0;
  padding-bottom: ${GEL_SPACING};
  padding-left: 0;

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    flex-direction: row;
  }
`;

const OptionsItem = styled.li`
  margin-bottom: ${GEL_SPACING};

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    width: calc(50% - ${GEL_SPACING});
  }

  a,
  button {
    ${({ service }) => getSansBold(service)}
    cursor: pointer;
    display: block;
  }

  a {
    padding-top: ${GEL_SPACING};
    padding-bottom: ${GEL_SPACING};
    text-align: center;
  }

  button {
    ${({ script }) => getLongPrimer(script)}
    background: ${C_GHOST};
    border: none;
    color: ${C_EBON};
    height: 100%;
    min-height: ${MIN_TAP_HEIGHT};
    padding: ${GEL_SPACING};
    width: 100%;
  }

  button[on='tap:AMP.setState({ isManagingSettings: true })'] {
    background: none;
    border: 0.0625rem solid ${C_CONSENT_ACTION};
    color: ${C_CONSENT_ACTION};
  }
`;

const AmpCookieBanner = ({
  dir,
  id,
  pages,
  accept,
  reject,
  hidden,
  script,
  service,
}) => {
  const [initial, manage] = pages;

  return (
    <div id={id} hidden={hidden}>
      <Helmet>
        <script
          async
          custom-element="amp-bind"
          src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
        />
      </Helmet>
      <Wrapper dir={dir} service={service}>
        <BannerPage data-amp-bind-hidden="isManagingSettings">
          <Title script={script}>{initial.title}</Title>
          <ScrollBox>
            <Paragraph script={script}>
              {initial.description.first}{' '}
              <a href={initial.description.linkUrl}>
                {initial.description.linkText}
              </a>{' '}
              {initial.description.last}
            </Paragraph>
            <OptionsList script={script}>
              <OptionsItem script={script} service={service}>
                {accept}
              </OptionsItem>
              <OptionsItem script={script} service={service}>
                <button
                  type="button"
                  on="tap:AMP.setState({ isManagingSettings: true })"
                >
                  {initial.manage}
                </button>
              </OptionsItem>
            </OptionsList>
          </ScrollBox>
        </BannerPage>
        <BannerPage hidden data-amp-bind-hidden="!isManagingSettings">
          <Title script={script}>{manage.title}</Title>
          <ScrollBox>
            <Paragraph script={script}>{manage.description.para1}</Paragraph>
            <Paragraph script={script}>{manage.description.para2}</Paragraph>
            <Heading>{manage.description.heading2}</Heading>
            <Paragraph script={script}>{manage.description.para3}</Paragraph>
            <Paragraph script={script}>
              <a href={manage.description.para4.url}>
                {manage.description.para4.text}
              </a>
            </Paragraph>
            <Paragraph script={script}>{manage.description.para5}</Paragraph>
            <Paragraph script={script}>{manage.description.para6}</Paragraph>
            <Paragraph script={script}>
              <a href={manage.description.para7.url}>
                {manage.description.para7.text}
              </a>
            </Paragraph>
            <Paragraph script={script}>{manage.description.para8}</Paragraph>
            <Paragraph script={script}>{manage.description.para9}</Paragraph>
            <OptionsList script={script}>
              <OptionsItem script={script} service={service}>
                {accept}
              </OptionsItem>
              <OptionsItem script={script} service={service}>
                {reject}
              </OptionsItem>
            </OptionsList>
          </ScrollBox>
        </BannerPage>
      </Wrapper>
    </div>
  );
};

AmpCookieBanner.propTypes = {
  dir: oneOf(['ltr', 'rtl']),
  pages: arrayOf(shape({})).isRequired,
  accept: element.isRequired,
  reject: element.isRequired,
  id: string,
  hidden: bool,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
};

AmpCookieBanner.defaultProps = {
  dir: 'ltr',
  id: null,
  hidden: null,
};

export default AmpCookieBanner;
