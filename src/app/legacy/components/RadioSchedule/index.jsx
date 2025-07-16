import React, { use } from 'react';
import Grid from '#psammead/psammead-grid/src';
import useViewTracker from '#app/hooks/useViewTracker';
import { ServiceContext } from '../../../contexts/ServiceContext';
import ProgramCard from './ProgramCard';
import StartTime from './StartTime';

const schedulesGridProps = {
  enableGelGutters: true,
  columns: {
    group0: 4,
    group1: 4,
    group2: 6,
    group3: 6,
    group4: 8,
    group5: 8,
  },
  margins: {
    group0: true,
    group1: true,
    group2: true,
  },
};

const programGridProps = {
  item: true,
  columns: {
    group0: 4,
    group1: 4,
    group2: 6,
    group3: 3,
    group4: 2,
    group5: 2,
  },
};

const RadioSchedule = ({ schedule, ...props }) => {
  const { dir } = use(ServiceContext);

  const eventTrackingData = {
    componentName: 'radio-schedule',
  };

  const viewTracker = useViewTracker(eventTrackingData);

  return (
    <ul 
      className="p-0 m-0 group-3-max:p-0 grid grid-cols-4 gap-4 group-2:grid-cols-6 group-3:grid-cols-6 group-4:grid-cols-8 group-5:grid-cols-8"
      role="list"
      {...viewTracker}
    >
      {schedule.map(({ id, ...program }) => (
        <li
          key={id}
          className="relative pb-double col-span-4 group-2:col-span-6 group-3:col-span-3 group-4:col-span-2 group-5:col-span-2 flex flex-col"
          data-e2e={program.state}
          role="listitem"
        >
          <div className="pb-single">
            <StartTime timestamp={program.startTime} />
          </div>
          <ProgramCard
            {...props}
            program={program}
            id={id} // This ID is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
          />
        </li>
      ))}
    </ul>
  );
};

export default RadioSchedule;
