/* eslint-disable react/no-danger */
import React from 'react';
import { Helmet } from 'react-helmet';
import { bool, string, element, oneOf, shape } from 'prop-types';
import styled from '@emotion/styled';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { C_CONSENT_BACKGROUND, C_WHITE } from '@bbc/psammead-styles/colours';
import { getGreatPrimer, getLongPrimer } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { GEL_GROUP_2_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
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

const Title = styled.h2`
  ${({ script }) => getGreatPrimer(script)}
  color: ${C_WHITE};
  margin-top: 0;
  margin-bottom: 0;
`;

const OptionsList = styled.ul`
  ${({ script }) => getLongPrimer(script)}
`;

const OptionsItem = styled.li`
  button {
    ${({ script }) => getGreatPrimer(script)}
  }
`;

const AmpCookieBanner = ({
  dir,
  id,
  title,
  text,
  accept,
  reject,
  manage,
  hidden,
  script,
  service,
}) => {
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
        <div data-amp-bind-hidden="isManagingSettings">
          <Title script={script}>{title}</Title>
          {text}
          <OptionsList script={script}>
            <OptionsItem script={script}>{accept}</OptionsItem>
            <OptionsItem script={script}>
              <button
                type="button"
                on="tap:AMP.setState({ isManagingSettings: true })"
              >
                {manage}
              </button>
            </OptionsItem>
          </OptionsList>
        </div>
        <div hidden data-amp-bind-hidden="!isManagingSettings">
          <Title script={script}>{title}</Title>
          {text}
          <OptionsList script={script}>
            <OptionsItem script={script}>{accept}</OptionsItem>
            <OptionsItem script={script}>{reject}</OptionsItem>
          </OptionsList>
        </div>
      </Wrapper>
    </div>
  );
};

AmpCookieBanner.propTypes = {
  dir: oneOf(['ltr', 'rtl']),
  title: string.isRequired,
  text: element.isRequired,
  accept: element.isRequired,
  reject: element.isRequired,
  manage: string.isRequired,
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
