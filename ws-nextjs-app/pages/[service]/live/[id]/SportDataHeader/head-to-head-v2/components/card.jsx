/* eslint-disable jsx-a11y/aria-role */
// import React from 'react';
// import styled from '@bbc/web-styled';

import styled from '@emotion/styled';

// import { createSize } from '@bbc/web-gel-foundations';
// import redcard from '@bbc/web-assets/static/sport/football/red-card.svg';
// import secondyellowcard from '@bbc/web-assets/static/sport/football/second-yellow-card.svg';

import redcard from '../assets/football/red-card.svg';
import secondyellowcard from '../assets/football/second-yellow-card.svg';

// eslint-disable-next-line import/no-relative-packages
import pixelsToRem from '../../../../../../../../src/app/utilities/pixelsToRem';

const CardImage = styled.img`
  padding: 0 ${pixelsToRem(3.2)}rem 0 ${pixelsToRem(3.2)}rem;
`;

const StyledRedCard = styled(CardImage)`
  width: ${pixelsToRem(11.2)}rem;
  margin-bottom: ${pixelsToRem(-3.2)}rem;
`;

const StyledYellowCard = styled(CardImage)`
  margin-bottom: ${pixelsToRem(-6.4)}rem;
  width: ${pixelsToRem(16)}rem;
`;

const CardContainer = styled.div`
  display: inline-block;
`;

const Card = ({ player }) => (
  <CardContainer role="text">
    {player.actions[0].type === 'Red Card' ? (
      <StyledRedCard
        aria-hidden
        alt=""
        data-testid="red-card-img"
        src={redcard}
      />
    ) : (
      <StyledYellowCard
        aria-hidden
        alt=""
        data-testid="second-yellow-card-img"
        src={secondyellowcard}
      />
    )}
  </CardContainer>
);

export default Card;
