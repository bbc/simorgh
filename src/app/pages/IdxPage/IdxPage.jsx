import React, { useContext, Fragment } from 'react';
import path from 'ramda/src/path';
import styled from '@emotion/styled';
import { string } from 'prop-types';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
  GEL_MARGIN_BELOW_400PX,
  GEL_MARGIN_ABOVE_400PX,
} from '#psammead/gel-foundations/src/spacings';
import IndexHeading from '#containers/IndexHeading';
import IndexPageContainer from '#components/PageLayout/IndexPageContainer';
import RadioScheduleContainer from '#containers/RadioSchedule';
import IndexPageSection from '#containers/IndexPageSection';
import idxPageDataPropTypes from '#models/propTypes/idxPage';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import MostRead from '#app/components/MostRead';
import ChartbeatAnalytics from '../../components/ChartbeatAnalytics';
import ATIAnalytics from '../../components/ATIAnalytics';
import { ServiceContext } from '../../contexts/ServiceContext';
import MetadataContainer from '../../components/Metadata';
import { GHOST } from '../../components/ThemeProvider/palette';
import LinkedData from '../../components/LinkedData';

const IdxMostReadSection = styled.div`
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

const IdxPage = ({ pageData, radioScheduleEndpointOverride }) => {
  const { brandName, mostRead, lang, radioSchedule } =
    useContext(ServiceContext);

  const groups = path(['content', 'groups'], pageData);
  const title = path(['metadata', 'title'], pageData);
  const summary = path(['metadata', 'summary'], pageData);
  const seoTitle = path(['promo', 'name'], pageData);
  const radioScheduleData = path(['radioScheduleData'], pageData);
  const radioScheduleOnIdxPage = path(['onIdxPage'], radioSchedule);
  const mostReadOnIdxPage = path(['onIdxPage'], mostRead);
  const radioScheduleIdxPosition = path(['idxPagePosition'], radioSchedule);

  const { mostRead: mostReadInitialData } = pageData;

  // ATI
  const {
    metadata: { atiAnalytics },
  } = pageData;

  const atiData = {
    ...atiAnalytics,
    pageTitle: `${atiAnalytics.pageTitle} - ${brandName}`,
  };

  const renderMostRead = () => (
    <IdxMostReadSection>
      <MostRead
        data={mostReadInitialData}
        columnLayout="twoColumn"
        headingBackgroundColour={GHOST}
      />
    </IdxMostReadSection>
  );

  return (
    <>
      <ATIAnalytics atiData={atiData} />
      <ChartbeatAnalytics title={title} />
      <ComscoreAnalytics />
      <MetadataContainer
        title={title}
        lang={lang}
        description={summary}
        openGraphType="website"
      />
      <LinkedData type="WebPage" seoTitle={seoTitle} />
      <main role="main">
        <IndexPageContainer>
          <IndexHeading id="content" pageType="idx">
            {title}
          </IndexHeading>
          {groups.map((group, index) => (
            <Fragment key={group.title}>
              {radioScheduleOnIdxPage &&
                radioScheduleIdxPosition === group.semanticGroupName && (
                  <StyledRadioScheduleContainer
                    lang="fa-AF"
                    initialData={radioScheduleData}
                    radioScheduleEndpointOverride={
                      radioScheduleEndpointOverride
                    }
                  />
                )}
              <IndexPageSection group={group} sectionNumber={index} />
            </Fragment>
          ))}
          {mostReadOnIdxPage && renderMostRead()}
        </IndexPageContainer>
      </main>
    </>
  );
};

IdxPage.propTypes = {
  pageData: idxPageDataPropTypes.isRequired,
  radioScheduleEndpointOverride: string,
};

IdxPage.defaultProps = {
  radioScheduleEndpointOverride: null,
};

export default IdxPage;
