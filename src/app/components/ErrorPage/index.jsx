import React from 'react';
import { string, arrayOf, shape } from 'prop-types';
import styled from 'styled-components';
import { Headline } from '@bbc/psammead-headings';
import InlineLink from '@bbc/psammead-inline-link';
import Paragraph from '@bbc/psammead-paragraph';
import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { getParagon, GEL_FF_REITH_SANS } from '@bbc/gel-foundations/typography';
import { GhostGrid, GridItemConstrainedMedium } from '../../lib/styledGrid';
import idSanitiser from '../../lib/utilities/idSanitiser';

const StatusCode = styled.span`
  ${props => (props.script ? getParagon(props.script) : '')};
  color: ${C_POSTBOX};
  display: block;
  font-family: ${GEL_FF_REITH_SANS};
  font-weight: 600;
  padding-bottom: 0.5rem;
`;

const ShortHeadline = styled(Headline)`
  padding: 2.5rem 0 2.5rem 0;
`;

const LongGridItemConstrainedMedium = styled(GridItemConstrainedMedium)`
  padding-bottom: 4rem;
`;

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
    <GhostGrid>
      <LongGridItemConstrainedMedium>
        <ShortHeadline script={script} service={service}>
          <StatusCode script={script}>{statusCode}</StatusCode>
          {title}
        </ShortHeadline>
        <Paragraph script={script} service={service}>
          {message}
        </Paragraph>
        <ul>
          {solutions.map(text => (
            <Paragraph
              script={script}
              as="li"
              key={idSanitiser(text)}
              service={service}
            >
              {text}
            </Paragraph>
          ))}
        </ul>
        <Paragraph script={script} service={service}>
          {callToActionFirst}
          <InlineLink href={callToActionLinkUrl}>
            {callToActionLinkText}
          </InlineLink>
          {callToActionLast}
        </Paragraph>
      </LongGridItemConstrainedMedium>
    </GhostGrid>
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
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
};

ErrorPage.defaultProps = {
  callToActionFirst: null,
  callToActionLast: null,
};

export default ErrorPage;
