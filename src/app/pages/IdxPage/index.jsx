import React, { useContext, Fragment } from 'react';
import path from 'ramda/src/path';
import { ServiceContext } from '#contexts/ServiceContext';
import RadioScheduleContainer from '#containers/RadioSchedule';
import PageContainer from '#lib/pageStyles/PageContainer';
import FrontPageSection from '#containers/FrontPageSection';
import idxPageDataPropTypes from '#models/propTypes/idxPage';

const IdxPage = ({ pageData }) => {
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
                <RadioScheduleContainer initialData={radioScheduleData} />
              )}
            <FrontPageSection group={group} sectionNumber={index} />
          </Fragment>
        ))}
      </PageContainer>
    </main>
  );
};

IdxPage.propTypes = {
  pageData: idxPageDataPropTypes.isRequired,
};

export default IdxPage;
