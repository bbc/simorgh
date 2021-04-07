import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { GEL_GROUP_3_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { grid } from '@bbc/psammead-styles/detection';
import Grid from '@bbc/psammead-grid';
import { arrayOf, number, shape, string } from 'prop-types';
import ProgramCard from '../ProgramCard';
import StartTime from '../StartTime';
import { ServiceContext } from '#contexts/ServiceContext';

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

const RadioScheduleItems = ({ schedule, ...props }) => {
  const { dir } = useContext(ServiceContext);
  return (
    <StyledGrid forwardedAs="ul" dir={dir} {...schedulesGridProps} role="list">
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
          <ProgramCard {...props} program={program} />
        </StyledFlexGrid>
      ))}
    </StyledGrid>
  );
};

const programPropTypes = shape({
  state: string.isRequired,
  startTime: number.isRequired,
  link: string.isRequired,
  brandTitle: string.isRequired,
  summary: string,
  duration: string.isRequired,
});

RadioScheduleItems.propTypes = {
  schedule: arrayOf(programPropTypes).isRequired,
};

export default RadioScheduleItems;
