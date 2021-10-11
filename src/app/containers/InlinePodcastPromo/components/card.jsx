import styled from '@emotion/styled';
// import { C_GHOST, C_EBON } from '@bbc/psammead-styles/colours';
// import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';

const Card = styled.div`
  background: #f4f4f4;
  float: left;

  width: 115px;
  height: 370px;
  margin: 0 6px 6px 8px;

  @media (min-width: 320px) {
    width: 150px;
    height: 350px;
    margin: 0 8px 8px 8px;
  }
  @media (min-width: 360px) {
    width: 175px;
  }
  @media (min-width: 400px) {
    margin: 0 13.5px 8px 16px;
  }
  @media (min-width: 600px) {
    width: 275px;
    height: 425px;
  }
  @media (min-width: 1008px) {
    width: 300px;
    height: 550px;
    margin: 0 13.5px 8px 0px;
  }
`;

export default Card;
