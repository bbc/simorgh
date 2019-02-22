import React from 'react';
import { func, string } from 'prop-types';
import styled from 'styled-components';
import { SubHeading } from '@bbc/psammead-headings';
import Paragraph from '@bbc/psammead-paragraph';
import { FF_NEWS_SANS_REG } from '@bbc/psammead-styles/fonts';
import {
  GEL_GREAT_PRIMER,
  GEL_BREVIER,
  GEL_LONG_PRIMER,
} from '@bbc/gel-foundations/typography';
import { GhostWrapper, GridItemConstrained } from '../../lib/styledGrid';

const grey = '#323232';
const orange = '#fa9900';
const white = '#ffffff';
const lightgrey = '#bdbdbd';

/*
 *
 * This CSS is awful, its a quick POC, no judging 🙈
 *
 */

const GhostSubHeading = styled(SubHeading)`
  ${GEL_GREAT_PRIMER}
  color: ${white};
  font-weight: 600;
  width: 23%;
  float: left;
`;

const GhostParagraph = styled(Paragraph)`
  ${GEL_BREVIER}
  color: ${lightgrey};
  padding: 0;
  float: left;
  padding: 1rem 0;
  width: 50%;
`;

const AgreeButton = styled.button`
  ${GEL_GREAT_PRIMER}
  font-weight: 600;
  background: none;
  color: ${orange};
  border: none;
  padding: 0;
  font-family: ${FF_NEWS_SANS_REG};
  cursor: pointer;
  outline: inherit;
  display: block;
  padding-bottom: 0.5rem;
`;

const SettingsLink = styled.a`
  ${GEL_LONG_PRIMER}
  color: ${orange};
  text-decoration: none;
  font-weight: 600;
  font-family: ${FF_NEWS_SANS_REG};
`;

const Options = styled.div`
  width: 21%;
  float: right;
  padding: 1rem 0;
`;

const GreyWrapper = styled(GhostWrapper)`
  background-color: ${grey};
`;

const CookieBanner = ({
  title,
  description,
  accept,
  reject,
  rejectUrl,
  allowAction,
  denyAction,
}) => (
  <GreyWrapper>
    <GridItemConstrained>
      <GhostSubHeading text={title}>{title}</GhostSubHeading>
      <GhostParagraph>{description}</GhostParagraph>
      <Options>
        <AgreeButton onClick={allowAction}>{accept}</AgreeButton>
        <SettingsLink href={rejectUrl} onClick={denyAction}>
          {reject}
        </SettingsLink>
      </Options>
    </GridItemConstrained>
  </GreyWrapper>
);

CookieBanner.propTypes = {
  title: string.isRequired,
  description: string.isRequired,
  accept: string.isRequired,
  reject: string.isRequired,
  rejectUrl: string.isRequired,
  allowAction: func.isRequired,
  denyAction: func.isRequired,
};

export default CookieBanner;
