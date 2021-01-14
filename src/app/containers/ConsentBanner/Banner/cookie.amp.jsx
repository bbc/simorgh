/* eslint-disable react/no-danger */

import React from 'react';
import { Helmet } from 'react-helmet';
import { bool, string, element, oneOf, shape } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';

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
      <div dir={dir}>
        <div data-amp-bind-hidden="isManagingSettings">
          <h2>{title}</h2>
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
          <h2>{title}</h2>
          {text}
          <ul>
            <li>{accept}</li>
            <li>{reject}</li>
          </ul>
        </div>
      </div>
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
