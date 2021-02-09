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
  C_WHITE,
  C_CONSENT_CONTENT,
  C_METAL,
} from '@bbc/psammead-styles/colours';
import {
  getDoublePica,
  getLongPrimer,
  getBodyCopy,
} from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
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

const HEADING_STYLES = `
  color: ${C_WHITE};
  margin-top: 0;
  margin-bottom: 0;
`;

const KEYLINE_STYLE = `0.0625rem solid ${C_METAL}`;

const CONTAINER_STYLES = `
  margin-left: ${GEL_MARGIN_BELOW_400PX};
  margin-right: ${GEL_MARGIN_BELOW_400PX};

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin-left: ${GEL_MARGIN_ABOVE_400PX};
    margin-right: ${GEL_MARGIN_ABOVE_400PX};
  }
`;

const Wrapper = styled.div`
  ${({ service }) => getSansRegular(service)}
  background-color: ${C_CONSENT_BACKGROUND};
  max-height: 100vh;
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
  ${HEADING_STYLES}
  ${CONTAINER_STYLES}
  padding-top: ${GEL_SPACING_DBL};
  padding-bottom: ${GEL_SPACING_DBL};
`;

const ScrollBox = styled.div`
  ${CONTAINER_STYLES}
  border-top: ${KEYLINE_STYLE};
  border-bottom: ${KEYLINE_STYLE};
  overflow-y: auto;
`;

const Heading = styled.h3`
  ${HEADING_STYLES}
`;

const Text = styled.p`
  ${({ script }) => script && getBodyCopy(script)}
  color: ${C_CONSENT_CONTENT};
  margin-top: ${GEL_SPACING_DBL};
  margin-bottom: ${GEL_SPACING_DBL};
`;

const OptionsList = styled.ul`
  ${({ script }) => getLongPrimer(script)}
  ${CONTAINER_STYLES}
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  list-style: none;
  margin-top: 0;
  margin-bottom: 0;
  padding-top: ${GEL_SPACING};
  padding-left: 0;

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    flex-direction: row;
  }
`;

const OptionsItem = styled.li`
  margin-bottom: ${GEL_SPACING};

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    width: calc(50% - ${GEL_SPACING});
    margin-bottom: ${GEL_SPACING};
  }

  a {
    cursor: pointer;
    display: block;
    padding-top: ${GEL_SPACING};
    padding-bottom: ${GEL_SPACING};
    text-align: center;
  }

  button {
    ${({ script }) => getLongPrimer(script)}
    background: ${C_WHITE};
    border: none;
    display: block;
    cursor: pointer;
    height: 100%;
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
            <Text script={script}>
              {initial.description.first}{' '}
              <a href={initial.description.linkUrl}>
                {initial.description.linkText}
              </a>{' '}
              {initial.description.last}
            </Text>
          </ScrollBox>
          <OptionsList script={script}>
            <OptionsItem script={script}>{accept}</OptionsItem>
            <OptionsItem script={script}>
              <button
                type="button"
                on="tap:AMP.setState({ isManagingSettings: true })"
              >
                {initial.manage}
              </button>
            </OptionsItem>
          </OptionsList>
        </BannerPage>
        <BannerPage hidden data-amp-bind-hidden="!isManagingSettings">
          <Title script={script}>{manage.title}</Title>
          <ScrollBox>
            <Text script={script}>{manage.description.para1}</Text>
            <Text script={script}>{manage.description.para2}</Text>
            <Heading>{manage.description.heading2}</Heading>
            <Text script={script}>{manage.description.para3}</Text>
            <Text script={script}>
              <a href={manage.description.para4.url}>
                {manage.description.para4.text}
              </a>
            </Text>
            <Text script={script}>{manage.description.para5}</Text>
            <Text script={script}>{manage.description.para6}</Text>
            <Text script={script}>
              <a href={manage.description.para7.url}>
                {manage.description.para7.text}
              </a>
            </Text>
            <Text script={script}>{manage.description.para8}</Text>
            <Text script={script}>{manage.description.para9}</Text>
          </ScrollBox>
          <OptionsList script={script}>
            <OptionsItem script={script}>{accept}</OptionsItem>
            <OptionsItem script={script}>{reject}</OptionsItem>
          </OptionsList>
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
