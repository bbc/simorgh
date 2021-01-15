/* eslint-disable react/no-danger */
import React from 'react';
import { Helmet } from 'react-helmet';
import { bool, string, element, oneOf, shape } from 'prop-types';
import styled from '@emotion/styled';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { C_CONSENT_BACKGROUND } from '@bbc/psammead-styles/colours';
import { getGreatPrimer } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';

const Wrapper = styled.div`
  ${({ service }) => getSansRegular(service)}
  background-color: ${C_CONSENT_BACKGROUND};
`;

const Title = styled.h2`
  ${({ script }) => script && getGreatPrimer(script)}
`;

const AmpCookieBanner = ({
  dir,
  id,
  title,
  text,
  accept,
  reject,
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
          <ul>
            <li>{accept}</li>
            <li>
              <button
                type="button"
                on="tap:AMP.setState({ isManagingSettings: true })"
              >
                Manage my settings
              </button>
            </li>
          </ul>
        </div>
        <div hidden data-amp-bind-hidden="!isManagingSettings">
          <Title script={script}>{title}</Title>
          {text}
          <ul>
            <li>{accept}</li>
            <li>{reject}</li>
          </ul>
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
