/* eslint-disable jsx-a11y/aria-role */
// import React from 'react';
// import styled from '@bbc/web-styled';

import styled from '@emotion/styled';
import { RedCardSVG, SecondYellowCardSVG } from '#app/components/icons';

// import { createSize } from '@bbc/web-gel-foundations';
// import redcard from '@bbc/web-assets/static/sport/football/red-card.svg';
// import secondyellowcard from '@bbc/web-assets/static/sport/football/second-yellow-card.svg';

import pixelsToRem from '../../../../utilities/pixelsToRem';

// in the original implementation, this is an img element with empty alt text and accepts a URL to the svg as an src.
const CardWrapper = styled.span`
  padding: 0 ${pixelsToRem(3.2)}rem;
  display: inline-block; // keeps styling in line with PS
  vertical-align: bottom; // keeps styling in line with PS
`;

const StyledRedCard = styled(CardWrapper)`
  width: ${pixelsToRem(11.2)}rem;
  margin-bottom: ${pixelsToRem(-3.2)}rem;
`;

const StyledYellowCard = styled(CardWrapper)`
  margin-bottom: ${pixelsToRem(-6.4)}rem;
  width: ${pixelsToRem(16)}rem;
`;

const CardContainer = styled.div`
  display: inline-block;
  box-sizing: content-box;
`;

const Card = ({ player }) => (
  <CardContainer role="text">
    {player.actions[0].type === 'Red Card' ? (
      <StyledRedCard aria-hidden data-testid="red-card-img">
        <RedCardSVG />
      </StyledRedCard>
    ) : (
      <StyledYellowCard aria-hidden data-testid="second-yellow-card-img">
        <SecondYellowCardSVG />
      </StyledYellowCard>
    )}
  </CardContainer>
);

export default Card;
