import styled from '@bbc/web-styled';
import { GROUP_3, createSize } from '@bbc/web-gel-foundations';

export const GRID_AREAS = {
  homeText: 'home_text',
  awayText: 'away_text',
  centreText: 'centre_text'
};

export const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    '${GRID_AREAS.centreText}   ${GRID_AREAS.centreText}'
    '${GRID_AREAS.homeText}     ${GRID_AREAS.awayText}';

  @media (min-width: ${GROUP_3}) {
    grid-template-columns: 1fr ${createSize(150)} 1fr;
    grid-template-areas: '${GRID_AREAS.homeText}   ${GRID_AREAS.centreText}   ${GRID_AREAS.awayText}';
  }
`;
