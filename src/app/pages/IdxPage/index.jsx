import React, { useContext, Fragment } from 'react';
import path from 'ramda/src/path';
import styled from 'styled-components';
import { node, string } from 'prop-types';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import { ServiceContext } from '#contexts/ServiceContext';
import RadioScheduleContainer from '#containers/RadioSchedule';
import MostReadContainer from '#containers/MostRead';
import MostReadSection from '#containers/MostRead/section';
import MostReadSectionLabel from '#containers/MostRead/label';
import PageContainer from '#lib/pageStyles/PageContainer';
import FrontPageSection from '#containers/FrontPageSection';
import idxPageDataPropTypes from '#models/propTypes/idxPage';

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

  const { radioSchedule } = useContext(ServiceContext);
  const radioScheduleData = path(['radioScheduleData'], pageData);
  const radioScheduleOnIdxPage = path(['onIdxPage'], radioSchedule);
  const radioScheduleIdxPosition = path(['idxPagePosition'], radioSchedule);

  return (
    <main role="main">
      <h1 id="content">IDX Page</h1>
      <PageContainer>
        {groups.map((group, index) => (
          <Fragment key={group.title}>
            {radioScheduleOnIdxPage &&
              radioScheduleIdxPosition === group.semanticGroupName && (
                <RadioScheduleContainer
                  initialData={radioScheduleData}
                  radioScheduleEndpointOverride={radioScheduleEndpointOverride}
                />
              )}
            <FrontPageSection group={group} sectionNumber={index} />
          </Fragment>
        ))}
        {onIdxPage && renderMostRead(mostReadEndpointOverride)}
      </PageContainer>
    </main>
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
