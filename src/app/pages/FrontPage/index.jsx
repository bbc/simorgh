/* eslint-disable jsx-a11y/aria-role */
import React, { Fragment, useContext } from 'react';
import { string, node } from 'prop-types';
import path from 'ramda/src/path';
import findIndex from 'ramda/src/findIndex';
import styled from 'styled-components';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
  GEL_MARGIN_BELOW_400PX,
  GEL_MARGIN_ABOVE_400PX,
} from '@bbc/gel-foundations/spacings';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { frontPageDataPropTypes } from '#models/propTypes/frontPage';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import LinkedData from '#containers/LinkedData';
import ATIAnalytics from '#containers/ATIAnalytics';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import AdContainer from '#containers/Ad';
import IndexPageContainer from '#app/components/PageLayout/IndexPageContainer';
import IndexPageSection from '#containers/IndexPageSection';
import RadioScheduleContainer from '#containers/RadioSchedule';
import MetadataContainer from '#containers/Metadata';
import MostReadContainer from '#containers/MostRead';
import MostReadSection from '#containers/MostRead/section';
import MostReadSectionLabel from '#containers/MostRead/label';
import CanonicalAdBootstrapJs from '#containers/Ad/Canonical/CanonicalAdBootstrapJs';

const FrontPageMostReadSection = styled(MostReadSection)`
  /* To centre page layout for Group 4+ */
  margin: 0 auto;
  width: 100%; /* Needed for IE11 */
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
`;

const StyledRadioScheduleContainer = styled(RadioScheduleContainer)`
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    /* To remove GEL Margins */
    margin: ${GEL_SPACING_QUAD} -${GEL_MARGIN_BELOW_400PX} 0;
    padding: 0 ${GEL_MARGIN_BELOW_400PX};
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin: ${GEL_SPACING_QUAD} -${GEL_MARGIN_ABOVE_400PX} 0;
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin: ${GEL_SPACING_TRPL} -${GEL_MARGIN_ABOVE_400PX} 0;
  }
`;

const MostReadWrapper = ({ children }) => (
  <FrontPageMostReadSection>
    <MostReadSectionLabel />
    {children}
  </FrontPageMostReadSection>
);

const renderMostRead = mostReadEndpointOverride => (
  <MostReadContainer
    mostReadEndpointOverride={mostReadEndpointOverride}
    columnLayout="twoColumn"
    wrapper={MostReadWrapper}
  />
);

MostReadWrapper.propTypes = {
  children: node.isRequired,
};

const FrontPage = ({ pageData, mostReadEndpointOverride }) => {
  const {
    ads,
    product,
    serviceLocalizedName,
    translations,
    frontPageTitle,
    radioSchedule,
  } = useContext(ServiceContext);

  const hasAds = path(['hasAds'], ads);
  const home = path(['home'], translations);
  const groups = path(['content', 'groups'], pageData);
  const lang = path(['metadata', 'language'], pageData);
  const description = path(['metadata', 'summary'], pageData);
  const seoTitle = path(['promo', 'name'], pageData);
  const radioScheduleData = path(['radioScheduleData'], pageData);
  const radioScheduleOnPage = path(['onFrontPage'], radioSchedule);
  const radioSchedulePosition = path(['frontPagePosition'], radioSchedule);
  const { isAmp } = useContext(RequestContext);

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
      {/* dotcom and dotcomConfig need to be setup before the main dotcom javascript file is loaded */}
      {hasAds && !isAmp && <CanonicalAdBootstrapJs />}
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
      <ComscoreAnalytics />
      <MetadataContainer
        title={frontPageTitle}
        lang={lang}
        description={description}
        openGraphType="website"
      />
      <LinkedData type="WebPage" seoTitle={seoTitle} />
      <AdContainer slotType="leaderboard" />
      <main role="main">
        <VisuallyHiddenText id="content" tabIndex="-1" as="h1">
          {offScreenText}
        </VisuallyHiddenText>
        <IndexPageContainer>
          {groups.map((group, index) => (
            <Fragment key={group.title}>
              {group.type === 'useful-links' && renderMostRead()}
              {radioScheduleOnPage &&
                radioSchedulePosition === group.semanticGroupName && (
                  <StyledRadioScheduleContainer
                    initialData={radioScheduleData}
                  />
                )}
              <IndexPageSection group={group} sectionNumber={index} />
              {group.type === 'top-stories' && <AdContainer slotType="mpu" />}
            </Fragment>
          ))}
          {!hasUsefulLinks && renderMostRead(mostReadEndpointOverride)}
        </IndexPageContainer>
      </main>
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
