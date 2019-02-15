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
import { ServiceContextConsumer } from '../../contexts/ServiceContext';

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

const ErrorMain = ({ status }) => (
  <main role="main">
    <Wrapper>
      <ServiceContextConsumer>
        {({ translations }) => (
          <LongGridItemConstrained>
            <StatusCode aria-hidden="true">{status}</StatusCode>
            <ShortHeadline
              aria-label={`${status} - ${translations.error[status].title}`}
            >
              {translations.error[status].title}
            </ShortHeadline>
            <Paragraph>{translations.error[status].message}</Paragraph>
            <ul>
              {translations.error[status].solutions.map(text => (
                <ListItem key={nanoid()}>{text}</ListItem>
              ))}
            </ul>
            <Paragraph>
              {translations.error[status].callToAction}
              <InlineLink href={translations.error[status].callToActionLinkUrl}>
                {translations.error[status].callToActionLinkText}
              </InlineLink>
            </Paragraph>
          </LongGridItemConstrained>
        )}
      </ServiceContextConsumer>
    </Wrapper>
  </main>
);

ErrorMain.propTypes = {
  status: number.isRequired,
};

export default ErrorMain;
