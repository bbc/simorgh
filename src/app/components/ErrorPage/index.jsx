import React from 'react';
import { string, arrayOf, shape } from 'prop-types';
import styled from 'styled-components';
import { GhostGrid, GridItemConstrainedMedium } from '../../lib/styledGrid';
import idSanitiser from '../../lib/utilities/idSanitiser';

const ErrorPage = ({
  statusCode,
  title,
  message,
  solutions,
  callToActionFirst,
  callToActionLinkText,
  callToActionLinkUrl,
  callToActionLast,
  script,
  service,
}) => (
  <main role="main">
    <p>Error page</p>
  </main>
);

ErrorPage.propTypes = {
  statusCode: string.isRequired,
  title: string.isRequired,
  message: string.isRequired,
  solutions: arrayOf(string).isRequired,
  callToActionFirst: string,
  callToActionLinkText: string.isRequired,
  callToActionLinkUrl: string.isRequired,
  callToActionLast: string,
  service: string.isRequired,
};

ErrorPage.defaultProps = {
  callToActionFirst: null,
  callToActionLast: null,
};

export default ErrorPage;
