import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { GEL_GROUP_3_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import { grid } from '#psammead/psammead-styles/src/detection';
import Grid from '#psammead/psammead-grid/src';
import useViewTracker from '#app/hooks/useViewTracker';
import { ServiceContext } from '../../../contexts/ServiceContext';
import ProgramCard from './ProgramCard';
import StartTime from './StartTime';

const StartTimeWrapper = styled.div`
  padding-bottom: ${GEL_SPACING};
`;

// Reset default of <ul> style
const StyledGrid = styled(Grid)`
  padding: 0;
  margin: 0;
  @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding: 0;
  }
`;

// Using flex-box on browsers that do not support grid will break grid fallback defined in psammead-grid
const StyledFlexGrid = styled(Grid)`
  @supports (${grid}) {
    display: flex;
    flex-direction: column;
  }
  position: relative;
  padding-bottom: ${GEL_SPACING_DBL};
`;

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
  const { dir } = useContext(ServiceContext);

  const eventTrackingData = {
    componentName: 'radio-schedule',
  };

  const viewRef = useViewTracker(eventTrackingData);

  return (
    <StyledGrid
      forwardedAs="ul"
      dir={dir}
      {...schedulesGridProps}
      role="list"
      ref={viewRef}
    >
      {schedule.map(({ id, ...program }) => (
        <StyledFlexGrid
          dir={dir}
          parentColumns={schedulesGridProps.columns}
          parentEnableGelGutters
          {...programGridProps}
          key={id}
          as="li"
          data-e2e={program.state}
          role="listitem"
        >
          <StartTimeWrapper>
            <StartTime timestamp={program.startTime} />
          </StartTimeWrapper>
          <ProgramCard
            {...props}
            program={program}
            id={id} // This ID is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
          />
        </StyledFlexGrid>
      ))}
    </StyledGrid>
  );
};

export default RadioSchedule;
