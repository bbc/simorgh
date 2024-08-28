import React, { Fragment, useContext } from 'react';
import path from 'ramda/src/path';
import findIndex from 'ramda/src/findIndex';
import styled from '@emotion/styled';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import IndexPageContainer from '#components/PageLayout/IndexPageContainer';
import IndexPageSection from '#containers/IndexPageSection';
import RadioScheduleContainer from '#containers/RadioSchedule';
import { NEGATIVE_MARGIN } from '#lib/styles.const';
import AdContainer from '../../components/Ad';
import MPUContainer from '../../components/Ad/MPU';
import MostRead from '../../components/MostRead';
import ATIAnalytics from '../../components/ATIAnalytics';
import ChartbeatAnalytics from '../../components/ChartbeatAnalytics';
import MetadataContainer from '../../components/Metadata';
import { ServiceContext } from '#contexts/ServiceContext';
import { GHOST } from '../../components/ThemeProvider/palette';
import LinkedData from '../../components/LinkedData';
import VisuallyHiddenText from '../../components/VisuallyHiddenText';

const FrontPageMostReadSection = styled.div`
  /* To centre page layout for Group 4+ */
  margin: 0 auto;
  width: 100%; /* Needed for IE11 */
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
`;

const StyledRadioScheduleContainer = styled(RadioScheduleContainer)`
  ${NEGATIVE_MARGIN}
`;

const FrontPage = ({ pageData }) => {
  const { product, serviceLocalizedName, translations, frontPageTitle } =
    useContext(ServiceContext);

  const home = path(['home'], translations);
  const groups = path(['content', 'groups'], pageData);
  const lang = path(['metadata', 'language'], pageData);
  const description = path(['metadata', 'summary'], pageData);
  const seoTitle = path(['promo', 'name'], pageData);
  const radioScheduleData = path(['radioScheduleData'], pageData);
  const radioSchedulePosition = path(['radioSchedulePosition'], pageData);

  const { mostRead: mostReadInitialData } = pageData;

  const renderMostRead = () => (
    <FrontPageMostReadSection>
      <MostRead
        data={mostReadInitialData}
        columnLayout="twoColumn"
        size="default"
        headingBackgroundColour={GHOST}
      />
    </FrontPageMostReadSection>
  );

  const offScreenText = (
    // eslint-disable-next-line jsx-a11y/aria-role
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
      <ChartbeatAnalytics title={pageData?.metadata?.title} />
      <ComscoreAnalytics />
      <MetadataContainer
        title={frontPageTitle}
        lang={lang}
        description={description}
        openGraphType="website"
        hasAmpPage={false}
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
              {radioScheduleData &&
                radioSchedulePosition === group.semanticGroupName && (
                  <StyledRadioScheduleContainer
                    initialData={radioScheduleData}
                  />
                )}
              <IndexPageSection group={group} sectionNumber={index} />
              {group.type === 'top-stories' && <MPUContainer />}
            </Fragment>
          ))}
          {!hasUsefulLinks && renderMostRead()}
        </IndexPageContainer>
      </main>
    </>
  );
};

export default FrontPage;
