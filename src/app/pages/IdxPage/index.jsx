import React, { useContext } from 'react';
import pathOr from 'ramda/src/path';
import { ServiceContext } from '#contexts/ServiceContext';
import RadioScheduleContainer from '#containers/RadioSchedule';

const IdxPage = ({ pageData }) => {
  const { idxPage } = useContext(ServiceContext);

  const radioScheduleData = pathOr(['radioScheduleData'], pageData);
  const radioScheduleOnIdxPage = pathOr(['hasRadioSchedule'], idxPage);
  const radioScheduleIdxPosition = pathOr(['idxPagePosition'], idxPage);
  const idxRadioScheduleOverride =
    './data/persian/bbc_dari_radio/schedule.json';

  return (
    <main role="main">
      <h1 id="content">IDX Page</h1>
      {radioScheduleOnIdxPage && (
        <RadioScheduleContainer
          initialData={radioScheduleData}
          radioScheduleEndpointOverride={idxRadioScheduleOverride}
        />
      )}
    </main>
  );
};

export default IdxPage;
