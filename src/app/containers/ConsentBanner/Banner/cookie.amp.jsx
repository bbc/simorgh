/* eslint-disable react/no-danger */
import React from 'react';
import { Helmet } from 'react-helmet';
import { bool, string, element, oneOf, shape } from 'prop-types';
import styled from '@emotion/styled';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import {
  C_CONSENT_BACKGROUND,
  C_CONSENT_ACTION,
  C_PEBBLE,
  C_WHITE,
} from '@bbc/psammead-styles/colours';
import { getDoublePica, getLongPrimer } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_MARGIN_BELOW_400PX,
  GEL_MARGIN_ABOVE_400PX,
  GEL_SPACING_DBL,
} from '@bbc/gel-foundations/spacings';

const Wrapper = styled.div`
  ${({ service }) => getSansRegular(service)}
  background-color: ${C_CONSENT_BACKGROUND};
  padding: ${GEL_SPACING_DBL} ${GEL_MARGIN_BELOW_400PX};

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_MARGIN_ABOVE_400PX};
  }
`;

const BannerPage = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN};

  a {
    color: ${C_CONSENT_ACTION};
    text-decoration: underline;
    text-decoration-color: ${C_PEBBLE};
  }
`;

const Title = styled.h2`
  ${({ script }) => getDoublePica(script)}
  color: ${C_WHITE};
  margin-top: 0;
  margin-bottom: 0;
`;

const OptionsList = styled.ul`
  ${({ script }) => getLongPrimer(script)}
  align-items: center;
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
`;

const OptionsItem = styled.li`
  button {
    ${({ script }) => getLongPrimer(script)}
    cursor: pointer;
  }
`;

const AmpCookieBanner = ({ dir, id, config, hidden, script, service }) => {
  const { initial, manage } = config;

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
          <Title script={script}>Title</Title>
          <p>Text.</p>
          <OptionsList script={script}>
            <OptionsItem script={script}>Accept</OptionsItem>
            <OptionsItem script={script}>
              <button
                type="button"
                on="tap:AMP.setState({ isManagingSettings: true })"
              >
                Manage my settings
              </button>
            </OptionsItem>
          </OptionsList>
        </BannerPage>
        <BannerPage hidden data-amp-bind-hidden="!isManagingSettings">
          <Title script={script}>Title</Title>
          <p>Text.</p>
          <OptionsList script={script}>
            <OptionsItem script={script}>Accept</OptionsItem>
            <OptionsItem script={script}>Reject</OptionsItem>
          </OptionsList>
        </BannerPage>
      </Wrapper>
    </div>
  );
};

AmpCookieBanner.propTypes = {
  dir: oneOf(['ltr', 'rtl']),
  config: shape({}).isRequired,
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
