import React, { useContext, Fragment } from 'react';
import path from 'ramda/src/path';
import styled from 'styled-components';
import { node, string } from 'prop-types';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import { ServiceContext } from '#contexts/ServiceContext';
import MetadataContainer from '#containers/Metadata';
import LinkedData from '#containers/LinkedData';
import IndexHeading from '#containers/IndexHeading';
import IndexPageContainer from '#app/components/PageLayout/IndexPageContainer';
import MostReadContainer from '#containers/MostRead';
import MostReadSection from '#containers/MostRead/section';
import MostReadSectionLabel from '#containers/MostRead/label';
import RadioScheduleContainer from '#containers/RadioSchedule';
import IndexPageSection from '#containers/IndexPageSection';
import idxPageDataPropTypes from '#models/propTypes/idxPage';
import ATIAnalytics from '#containers/ATIAnalytics';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';

const IdxMostReadSection = styled(MostReadSection)`
  /* To centre page layout for Group 4+ */
  margin: 0 auto;
  width: 100%; /* Needed for IE11 */
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
`;

const MostReadWrapper = ({ children }) => (
  <IdxMostReadSection>
    <MostReadSectionLabel />
    {children}
  </IdxMostReadSection>
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

const IdxPage = ({
  pageData,
  mostReadEndpointOverride,
  radioScheduleEndpointOverride,
}) => {
  const {
    mostRead: { onIdxPage },
  } = useContext(ServiceContext);
  const groups = path(['content', 'groups'], pageData);
  const title = path(['metadata', 'title'], pageData);
  const lang = path(['metadata', 'language'], pageData);
  const summary = path(['metadata', 'summary'], pageData);
  const seoTitle = path(['promo', 'name'], pageData);

  const { radioSchedule } = useContext(ServiceContext);
  const radioScheduleData = path(['radioScheduleData'], pageData);
  const radioScheduleOnIdxPage = path(['onIdxPage'], radioSchedule);
  const radioScheduleIdxPosition = path(['idxPagePosition'], radioSchedule);

  return (
    <>
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
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
                  <RadioScheduleContainer
                    initialData={radioScheduleData}
                    radioScheduleEndpointOverride={
                      radioScheduleEndpointOverride
                    }
                  />
                )}
              <IndexPageSection group={group} sectionNumber={index} />
            </Fragment>
          ))}
          {onIdxPage && renderMostRead(mostReadEndpointOverride)}
        </IndexPageContainer>
      </main>
    </>
  );
};

IdxPage.propTypes = {
  pageData: idxPageDataPropTypes.isRequired,
  mostReadEndpointOverride: string,
  radioScheduleEndpointOverride: string,
};

IdxPage.defaultProps = {
  mostReadEndpointOverride: null,
  radioScheduleEndpointOverride: null,
};

export default IdxPage;
