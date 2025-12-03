import React from 'react';
import styled from '@emotion/styled';

// styled-components removes non-standard attributes (such as AMP attributes) on
// server rendering. spreading props like this allows us to add AMP attributes
// to the element.
const AccessDiv = props => <div {...props} />;

// Nielsen should only run in AU,
// Using amp-geo to hide/display based on the country
// amp-analytics doesn't generate any call if display none
const DisplayWrapper = styled(AccessDiv)`
  display: none;
  visibility: hidden;
  .amp-iso-country-au & {
    display: block;
  }
`;

const AmpNielsenAnalytics = ({ apid, section }) => (
  <DisplayWrapper>
    <amp-analytics type="nielsen">
      <script
        type="application/json"
        /* eslint-disable-next-line react/no-danger */
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            vars: {
              apid,
              section,
              apv: '1.0',
              type: 'static',
              segC: 'BBC - Google AMP',
            },
          }),
        }}
      />
    </amp-analytics>
  </DisplayWrapper>
);

export default AmpNielsenAnalytics;
