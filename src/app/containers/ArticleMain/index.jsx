import React from 'react';
import { Helmet } from 'react-helmet';
import * as Amp from 'react-amphtml';
import styled from 'styled-components';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
// import MostRead from '#app/components/MostReadAmp';
import Grid from '@bbc/psammead-grid';
import { getFoolscap, getDoublePica } from '@bbc/gel-foundations/typography';
import { GEL_GROUP_5_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';

import { C_EBON, C_POSTBOX } from '@bbc/psammead-styles/colours';
import {
  getSerifLight,
  getSerifMedium,
} from '@bbc/psammead-styles/font-styles';
import { arabic } from '@bbc/gel-foundations/scripts';

const paddingStart = ({ dir }) => `padding-${dir === 'ltr' ? 'left' : 'right'}`;

const StyledItem = styled.div`
  padding-bottom: ${GEL_SPACING_TRPL};
  ${paddingStart}: ${GEL_SPACING_DBL};
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    padding-top: ${GEL_SPACING};
    ${paddingStart}: ${GEL_SPACING_QUAD};
  }
`;

export const MostReadRank = styled.span`
  ${({ service }) => getSerifLight(service)}
  color: ${C_POSTBOX};
  ${({ script }) => script && getFoolscap(script)};
  margin: 0; /* Reset */
  padding: 0;
  display: inline-block;
  width: 3rem;
`;

const Headline = styled.h1`
  color: red;
  ${({ text }) => text && `color: blue;`}
  font-size: 100px
  display: block; /* Explicitly set */
`;

const AMP_ACCESS_DATA = endpoint => ({
  authorization: endpoint,
  noPingback: true,
});
const AMP_ACCESS_FETCH = endpoint => (
  <script id="amp-access" type="application/json">
    {JSON.stringify(AMP_ACCESS_DATA(endpoint))}
  </script>
);
const HeadlineWrapper = ({ records }) => {
  return <Headline>{records}</Headline>;
};

const StyledOl = styled.ol.attrs({
  role: 'list',
})`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const MostReadListProps = {
  enableGelGutters: true,
  enableGelMargins: true,
  columns: {
    group0: 18,
    group1: 18,
    group2: 18,
    group3: 18,
    group4: 24,
    group5: 60,
  },
};

const MostReadItemProps = {
  columns: {
    group0: 18,
    group1: 18,
    group2: 9,
    group3: 9,
    group4: 12,
    group5: 12,
  },
};

const StyledLink = styled.a`
  color: ${C_EBON};
  ${({ script }) => script && getDoublePica(script)};
  ${({ service }) => getSerifMedium(service)}
  text-decoration: none;
  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const MostReadRankProps = {
  columns: {
    group0: 2,
    group1: 2,
    group2: 2,
    group3: 2,
    group4: 2,
    group5: 2,
  },
  item: true,
};

const MostReadLinkProps = {
  item: true,
  columns: {
    group0: 16,
    group1: 16,
    group2: 7,
    group3: 7,
    group4: 10,
    group5: 10,
  },
};

const ArticleMain = ({ articleData: data }) => {
  return (
    <>
      <Helmet>
        <script
          async
          custom-element="amp-script"
          src="https://cdn.ampproject.org/v0/amp-script-0.1.js"
        ></script>
        <script
          async
          custom-element="amp-list"
          src="https://cdn.ampproject.org/v0/amp-list-0.1.js"
        ></script>
        <script
          async
          custom-template="amp-mustache"
          src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"
        ></script>
        <script
          async
          custom-element="amp-access"
          src="https://cdn.ampproject.org/v0/amp-access-0.1.js"
        ></script>
        {AMP_ACCESS_FETCH(
          'http://localhost:7080/amp-script/mostReadLocal.json',
        )}

        <meta name="simorghstuff" content="Helmet khoaphanmetadata" />
      </Helmet>

      <section amp-access="totalRecords > 0">
        <h2>totalRecods exists and is available</h2>
        <Amp.Template
          specName="default"
          type="amp-mustache"
          amp-access-template="true"
        >
          <Headline text="{{lastRecordTimeStamp}}">
            lastRecordTimeStamp: {typeof '{{lastRecordTimeStamp}}'}
          </Headline>

          <HeadlineWrapper records="{{records}}" />
          <Headline>generated: {'{{generated}}'}</Headline>
          <StyledOl>
            <Grid {...MostReadListProps} dir="ltr">
              {'{{#records}}'}

              <Grid {...MostReadItemProps} dir="ltr" forwardedAs="li">
                <Grid {...MostReadRankProps} dir="ltr">
                  <MostReadRank service="news" script={arabic}>
                    1
                  </MostReadRank>
                </Grid>
                <Grid {...MostReadLinkProps} dir="ltr">
                  <StyledItem dir="ltr">
                    <StyledLink
                      href={'{{promo.locators.assetUri}}'}
                      script={arabic}
                      service="news"
                    >
                      {'{{promo.headlines.shortHeadline}}'}{' '}
                    </StyledLink>
                  </StyledItem>
                </Grid>
              </Grid>
              {'{{/records}}'}
            </Grid>
          </StyledOl>
        </Amp.Template>
      </section>
      <amp-script
        layout="container"
        data-ampdevmode="true" // bypasses amp checks such as is on https and js size
        sandbox="allow-forms" // allows form input like buttons
        src={`http://localhost:7080/amp-script/testingFetch.js`}
      >
        <button>testing my lazers</button>
        {/* Root Div for react app to render into */}
        <div id="root"></div>
      </amp-script>
    </>
  );
};

export default ArticleMain;
