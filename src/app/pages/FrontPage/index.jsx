/* eslint-disable jsx-a11y/aria-role */
import React, { Fragment, useContext } from 'react';
import { string } from 'prop-types';
import path from 'ramda/src/path';
import findIndex from 'ramda/src/findIndex';
import styled from 'styled-components';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
  GEL_SPACING_QUIN,
  GEL_MARGIN_BELOW_400PX,
  GEL_MARGIN_ABOVE_400PX,
} from '@bbc/gel-foundations/spacings';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { frontPageDataPropTypes } from '#models/propTypes/frontPage';
import { ServiceContext } from '#contexts/ServiceContext';
import FrontPageSection from '#containers/FrontPageSection';
import MetadataContainer from '#containers/Metadata';
import MostReadContainer from '#containers/MostRead';
import RadioScheduleContainer from '#containers/RadioSchedule';
import LinkedData from '#containers/LinkedData';
import ATIAnalytics from '#containers/ATIAnalytics';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';

export const StyledFrontPageDiv = styled.div`
  /* To add GEL Margins */
  margin: 0 ${GEL_MARGIN_BELOW_400PX};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin: 0 ${GEL_MARGIN_ABOVE_400PX};
  }

  /* To add extra spacing */
  padding-top: ${GEL_SPACING};
  padding-bottom: ${GEL_SPACING_QUAD};

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding-top: ${GEL_SPACING_DBL};
  }

  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    padding-bottom: ${GEL_SPACING_TRPL};
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding-top: 0;
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding-bottom: ${GEL_SPACING_QUIN};
  }
`;

const FrontPage = ({ pageData, mostReadEndpointOverride }) => {
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

  const renderMostRead = () => (
    <MostReadContainer
      mostReadEndpointOverride={mostReadEndpointOverride}
      columnLayout="twoColumn"
      isOnFrontPage
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
      <main role="main">
        <VisuallyHiddenText id="content" tabIndex="-1" as="h1">
          {offScreenText}
        </VisuallyHiddenText>
        <StyledFrontPageDiv>
          {groups.map((group, index) => (
            <Fragment key={group.title}>
              {group.type === 'useful-links' && renderMostRead()}
              <FrontPageSection group={group} sectionNumber={index} />
              {group.type === 'top-stories' && <RadioScheduleContainer />}
            </Fragment>
          ))}
          {!hasUsefulLinks && renderMostRead()}
        </StyledFrontPageDiv>
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
