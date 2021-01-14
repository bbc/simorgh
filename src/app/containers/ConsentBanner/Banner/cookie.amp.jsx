/* eslint-disable react/no-danger */

import React from 'react';
import { Helmet } from 'react-helmet';
import { bool, string } from 'prop-types';

const AMP_BIND_STYLES = `
  .foo {}
`;

const AmpCookieBanner = ({ id, hidden, title }) => {
  return (
    <div id={id} hidden={hidden}>
      <Helmet>
        <script
          async
          custom-element="amp-bind"
          src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
        />
        <style type="text/css">{AMP_BIND_STYLES}</style>
      </Helmet>
      <amp-state id="consentBanner">
        <script
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: `
                {
                  "isManagingSettings": true
                }
              `,
          }}
        />
      </amp-state>
      <div>
        <h2>{title}</h2>
      </div>
    </div>
  );
};

AmpCookieBanner.propTypes = {
  id: string.isRequired,
  hidden: bool,
  title: string.isRequired,
};

AmpCookieBanner.defaultProps = {
  hidden: null,
};

export default AmpCookieBanner;
