import React from 'react';
import { number } from 'prop-types';
import nanoid from 'nanoid';
import styled from 'styled-components';
import { Headline } from '@bbc/psammead-headings';
import InlineLink from '@bbc/psammead-inline-link';
import Paragraph from '@bbc/psammead-paragraph';
import { C_POSTBOX } from '@bbc/psammead-styles/colours';
import { GEL_PARAGON } from '@bbc/gel-foundations/typography';
import { FF_NEWS_SANS_REG } from '@bbc/psammead-styles/fonts';
import { Wrapper, GridItemConstrained } from '../../lib/styledGrid';

const errorMessaging = {
  404: {
    title: 'Page can not be found',
    message:
      'Sorry, we’re unable to bring you the page you’re looking for. Please try:',
    solutions: [
      'Double checking the url',
      'Hitting the refresh button in your browser',
      'Searching for this page using the BBC search bar',
    ],
  },
  500: {
    title: 'Internal server error',
    message:
      "Sorry, we’re currently unable to bring you the page you're looking for. Please try:",
    solutions: [
      'Hitting the refresh button in your browser',
      'Coming back again later',
    ],
  },
};

const StatusCode = styled.p`
  ${GEL_PARAGON}
  color: ${C_POSTBOX};
  display: block;
  font-family: ${FF_NEWS_SANS_REG};
  font-weight: bold;
  margin-bottom: 0;
`;

const ShortHeadline = styled(Headline)`
  padding: 1rem 0 3rem 0;
`;

const LongGridItemConstrained = styled(GridItemConstrained)`
  padding-bottom: 4rem;
`;

const ListItem = Paragraph.withComponent('li');

const ErrorMain = ({ status }) => {
  const messaging = errorMessaging[status] || errorMessaging[500];

  return (
    <main role="main">
      <Wrapper>
        <LongGridItemConstrained>
          <StatusCode aria-hidden="true">{status}</StatusCode>
          <ShortHeadline aria-label={`${status} - ${messaging.title}`}>
            {messaging.title}
          </ShortHeadline>
          <Paragraph>{messaging.message}</Paragraph>
          <ul>
            {messaging.solutions.map(text => (
              <ListItem key={nanoid()}>{text}</ListItem>
            ))}
          </ul>
          <Paragraph>
            {'Alternatively, please visit the '}
            <InlineLink href="https://www.bbc.com/news">
              BBC News homepage.
            </InlineLink>
          </Paragraph>
        </LongGridItemConstrained>
      </Wrapper>
    </main>
  );
};

ErrorMain.propTypes = {
  status: number.isRequired,
};

export default ErrorMain;
