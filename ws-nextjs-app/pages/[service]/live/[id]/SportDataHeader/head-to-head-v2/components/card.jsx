/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import styled from '@bbc/web-styled';
import { createSize } from '@bbc/web-gel-foundations';
import redcard from '@bbc/web-assets/static/sport/football/red-card.svg';
import secondyellowcard from '@bbc/web-assets/static/sport/football/second-yellow-card.svg';

const CardImage = styled.img`
  padding: 0 ${createSize(3.2)} 0 ${createSize(3.2)};
`;

const StyledRedCard = styled(CardImage)`
  width: ${createSize(11.2)};
  margin-bottom: ${createSize(-3.2)};
`;

const StyledYellowCard = styled(CardImage)`
  margin-bottom: ${createSize(-6.4)};
  width: ${createSize(16)};
`;

const CardContainer = styled.div`
  display: inline-block;
`;

const Card = ({ player }) => (
  <CardContainer role="text">
    {player.actions[0].type === 'Red Card' ? (
      <StyledRedCard aria-hidden alt="" data-testid="red-card-img" src={redcard} />
    ) : (
      <StyledYellowCard aria-hidden alt="" data-testid="second-yellow-card-img" src={secondyellowcard} />
    )}
  </CardContainer>
);

export default Card;
