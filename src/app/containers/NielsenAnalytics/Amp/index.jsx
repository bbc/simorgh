import React from 'react';
import styled from '@emotion/styled';

const JsonInlinedScript = data => (
  <script
    type="application/json"
    /* eslint-disable-next-line react/no-danger */
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

// styled-components removes non-standard attributes (such as AMP attributes) on
// server rendering. spreading props like this allows us to add AMP attributes
// to the element.
const AccessDiv = props => <div {...props} />;

// Nielsen should only run in AU,
// Using amp-geo to hide/display ased in the country
// amp-analytics doesn't generate any call if display none
const DisplayWrapper = styled(AccessDiv)`
  .amp-geo-pending &,
  .amp-geo-group-gbOrUnknown & {
    display: none;
    visibility: hidden;
  }
  .amp-iso-country-au & {
    display: block;
  }
`;

const AmpNielsenAnalytics = ({ nielsenData }) => (
  <DisplayWrapper>
    <amp-analytics type="nielsen">
      {JsonInlinedScript(nielsenData)}
    </amp-analytics>
  </DisplayWrapper>

);

export default AmpNielsenAnalytics;