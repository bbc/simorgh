/* eslint-disable jsx-a11y/aria-role */
import React, { Fragment, useContext } from 'react';
import pipe from 'ramda/src/pipe';
import { string } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import path from 'ramda/src/path';
import findIndex from 'ramda/src/findIndex';
import Grid, { FrontPageGrid } from '#app/components/Grid';
import { frontPageDataPropTypes } from '#models/propTypes/frontPage';
import { ServiceContext } from '#contexts/ServiceContext';
import FrontPageSection from '#containers/FrontPageSection';
import MetadataContainer from '#containers/Metadata';
import MostReadContainer from '#containers/MostRead';
import LinkedData from '#containers/LinkedData';
import ATIAnalytics from '#containers/ATIAnalytics';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';

// Page Handlers
import withVariant from '#containers/PageHandlers/withVariant';
import withContexts from '#containers/PageHandlers/withContexts';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import withLoading from '#containers/PageHandlers/withLoading';
import withError from '#containers/PageHandlers/withError';
import withData from '#containers/PageHandlers/withData';

const mainColumns = {
  group0: 6,
  group1: 6,
  group2: 6,
  group3: 6,
  group4: 8,
  group5: 20,
};

const itemColumns = {
  group0: 6,
  group1: 6,
  group2: 6,
  group3: 6,
  group4: 6,
  group5: 12,
};

const itemMargins = {
  group0: true,
  group1: true,
  group2: true,
  group3: true,
};

const startOffsets = {
  group0: 1,
  group1: 1,
  group2: 1,
  group3: 1,
  group4: 2,
  group5: 5,
};

const FrontPageContainer = ({ pageData, mostReadEndpointOverride }) => {
  const {
    product,
    serviceLocalizedName,
    translations,
    frontPageTitle,
  } = useContext(ServiceContext);
  const home = path(['home'], translations);
  const groups = path(['content', 'groups'], pageData);
  const lang = path(['metadata', 'language'], pageData);
  const description = path(['metadata', 'summary'], pageData);
  const seoTitle = path(['promo', 'name'], pageData);

  // eslint-disable-next-line jsx-a11y/aria-role
  const offScreenText = (
    <span role="text">
      <span lang="en-GB">{product}</span>, {serviceLocalizedName} - {home}
    </span>
  );

  // Most Read is required to render above useful-links if it exists
  const hasUsefulLinks =
    findIndex(group => group.type === 'useful-links')(groups) > -1;

  return (
    <>
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
      <MetadataContainer
        title={frontPageTitle}
        lang={lang}
        description={description}
        openGraphType="website"
      />
      <LinkedData type="WebPage" seoTitle={seoTitle} />
      <main role="main">
        <VisuallyHiddenText id="content" tabIndex="-1" as="h1">
          {offScreenText}
        </VisuallyHiddenText>
        <FrontPageGrid columns={mainColumns} enableGelGutters>
          <Grid
            item
            columns={itemColumns}
            startOffset={startOffsets}
            margins={itemMargins}
          >
            {groups.map((group, index) => (
              <Fragment key={group.title}>
                {group.type === 'useful-links' && (
                  <MostReadContainer
                    mostReadEndpointOverride={mostReadEndpointOverride}
                  />
                )}
                <FrontPageSection group={group} sectionNumber={index} />
              </Fragment>
            ))}
            {!hasUsefulLinks && (
              <MostReadContainer
                mostReadEndpointOverride={mostReadEndpointOverride}
              />
            )}
          </Grid>
        </FrontPageGrid>
      </main>
    </>
  );
};

FrontPageContainer.propTypes = {
  pageData: frontPageDataPropTypes.isRequired,
  mostReadEndpointOverride: string,
};

FrontPageContainer.defaultProps = {
  mostReadEndpointOverride: null,
};

const EnhancedFrontPageContainer = pipe(
  withData,
  withError,
  withLoading,
  withPageWrapper,
  withContexts,
  withVariant,
)(FrontPageContainer);

export default EnhancedFrontPageContainer;
