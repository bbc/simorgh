import React from 'react';
import { string, arrayOf } from 'prop-types';
import nanoid from 'nanoid';
import styled from 'styled-components';
import { Headline } from '@bbc/psammead-headings';
import InlineLink from '@bbc/psammead-inline-link';
import Paragraph from '@bbc/psammead-paragraph';
import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { GEL_PARAGON } from '@bbc/gel-foundations/typography';
import { FF_NEWS_SANS_REG } from '@bbc/psammead-styles/fonts';
import { GhostWrapper, GridItemConstrainedMedium } from '../../lib/styledGrid';

const StatusCode = styled.span`
  ${GEL_PARAGON}
  color: ${C_POSTBOX};
  display: block;
  font-family: ${FF_NEWS_SANS_REG};
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
}) => (
  <main role="main">
    <GhostWrapper>
      <LongGridItemConstrainedMedium>
        <ShortHeadline>
          <StatusCode>{statusCode}</StatusCode>
          {title}
        </ShortHeadline>
        <Paragraph>{message}</Paragraph>
        <ul>
          {solutions.map(text => (
            <Paragraph as="li" key={nanoid()}>
              {text}
            </Paragraph>
          ))}
        </ul>
        <Paragraph>
          {callToActionFirst}
          <InlineLink href={callToActionLinkUrl}>
            {callToActionLinkText}
          </InlineLink>
          {callToActionLast}
        </Paragraph>
      </LongGridItemConstrainedMedium>
    </GhostWrapper>
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
};

ErrorPage.defaultProps = {
  callToActionFirst: null,
  callToActionLast: null,
};

export default ErrorPage;
