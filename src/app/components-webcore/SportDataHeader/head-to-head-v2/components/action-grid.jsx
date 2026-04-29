// import styled from '@bbc/web-styled';
import styled from '@emotion/styled';

// import { GROUP_3, createSize } from '@bbc/web-gel-foundations';

// eslint-disable-next-line import/no-relative-packages
import pixelsToRem from '../../../../utilities/pixelsToRem';

export const GRID_AREAS = {
  homeText: 'home_text',
  awayText: 'away_text',
  centreText: 'centre_text',
};

export const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    '${GRID_AREAS.centreText}   ${GRID_AREAS.centreText}'
    '${GRID_AREAS.homeText}     ${GRID_AREAS.awayText}';

  @media (min-width: ${pixelsToRem(600)}rem) {
    grid-template-columns: 1fr ${pixelsToRem(150)}rem 1fr;
    grid-template-areas: '${GRID_AREAS.homeText}   ${GRID_AREAS.centreText}   ${GRID_AREAS.awayText}';
  }
`;
