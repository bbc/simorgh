import React, { useContext } from 'react';
import pathOr from 'ramda/src/path';
import { ServiceContext } from '#contexts/ServiceContext';
import RadioScheduleContainer from '#containers/RadioSchedule';

const IdxPage = ({ pageData }) => {
  const { radioSchedule } = useContext(ServiceContext);

  const radioScheduleData = pathOr(['radioScheduleData'], pageData);
  const radioScheduleOnIdxPage = pathOr(['onIdxPage'], radioSchedule);
  // const radioScheduleIdxPosition = pathOr(['idxPagePosition'], idxPage);

  return (
    <main role="main">
      <h1 id="content">IDX Page</h1>
      {radioScheduleOnIdxPage && (
        <RadioScheduleContainer initialData={radioScheduleData} />
      )}
    </main>
  );
};

export default IdxPage;
