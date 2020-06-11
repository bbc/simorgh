/* eslint-disable jsx-a11y/aria-role */
import React, { Fragment, useContext } from 'react';
import { string, node } from 'prop-types';
import path from 'ramda/src/path';
import findIndex from 'ramda/src/findIndex';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { frontPageDataPropTypes } from '#models/propTypes/frontPage';
import { ServiceContext } from '#contexts/ServiceContext';
import FrontPageSection from '#containers/FrontPageSection';
import MetadataContainer from '#containers/Metadata';
import MostReadContainer from '#containers/MostRead';
import MostReadSectionLabel from '#containers/MostRead/label';
import RadioScheduleContainer from '#containers/RadioSchedule';
import AdContainer from '#containers/Ad';
import LinkedData from '#containers/LinkedData';
import ATIAnalytics from '#containers/ATIAnalytics';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';
import IndexPageContainer from '#app/components/PageLayout/IndexPageContainer';
import { CPSGrid } from '#app/components/Grid';

const FrontPage = ({ pageData, mostReadEndpointOverride }) => {
  const {
    product,
    serviceLocalizedName,
    translations,
    frontPageTitle,
    radioSchedule,
  } = useContext(ServiceContext);

  const home = path(['home'], translations);
  const groups = path(['content', 'groups'], pageData);
  const lang = path(['metadata', 'language'], pageData);
  const description = path(['metadata', 'summary'], pageData);
  const seoTitle = path(['promo', 'name'], pageData);
  const radioScheduleData = path(['radioScheduleData'], pageData);
  const radioScheduleOnPage = path(['onFrontPage'], radioSchedule);
  const radioSchedulePosition = path(['frontPagePosition'], radioSchedule);

  // eslint-disable-next-line jsx-a11y/aria-role
  const offScreenText = (
    <span role="text">
      <span lang="en-GB">{product}</span>, {serviceLocalizedName} - {home}
    </span>
  );

  // Most Read is required to render above useful-links if it exists
  const hasUsefulLinks =
    findIndex(group => group.type === 'useful-links')(groups) > -1;

  const MostReadWrapper = ({ children }) => (
    <CPSGrid
      item
      forwardedAs="section"
      role="region"
      aria-labelledby="Most-Read"
      data-e2e="most-read"
    >
      <MostReadSectionLabel />
      {children}
    </CPSGrid>
  );

  MostReadWrapper.propTypes = {
    children: node.isRequired,
  };

  const renderMostRead = () => (
    <MostReadContainer
      mostReadEndpointOverride={mostReadEndpointOverride}
      columnLayout="twoColumn"
      wrapper={MostReadWrapper}
    />
  );

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
      <IndexPageContainer as="main" role="main">
        <VisuallyHiddenText id="content" tabIndex="-1" as="h1">
          {offScreenText}
        </VisuallyHiddenText>
        <AdContainer />
        <CPSGrid enableMargins>
          {groups.map((group, index) => (
            <Fragment key={group.title}>
              {group.type === 'useful-links' && renderMostRead()}
              {radioScheduleOnPage &&
                radioSchedulePosition === group.semanticGroupName && (
                  <RadioScheduleContainer initialData={radioScheduleData} />
                )}
              <FrontPageSection group={group} sectionNumber={index} />
            </Fragment>
          ))}
          {!hasUsefulLinks && renderMostRead()}
        </CPSGrid>
      </IndexPageContainer>
    </>
  );
};

FrontPage.propTypes = {
  pageData: frontPageDataPropTypes.isRequired,
  mostReadEndpointOverride: string,
};

FrontPage.defaultProps = {
  mostReadEndpointOverride: null,
};

export default FrontPage;
