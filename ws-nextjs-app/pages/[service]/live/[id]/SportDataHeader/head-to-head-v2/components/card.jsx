/* eslint-disable jsx-a11y/aria-role */
// import React from 'react';
// import styled from '@bbc/web-styled';

import styled from '@emotion/styled';

// import { createSize } from '@bbc/web-gel-foundations';
// import redcard from '@bbc/web-assets/static/sport/football/red-card.svg';
// import secondyellowcard from '@bbc/web-assets/static/sport/football/second-yellow-card.svg';

// eslint-disable-next-line import/no-relative-packages
import pixelsToRem from '../../../../../../../../src/app/utilities/pixelsToRem';

// TO DO - either get these from static assets or use a fallback URL
const tempRedCardSrc =
  'https://static.files.bbci.co.uk/core/website/assets/static/sport/football/red-card.870c169464.svg';
const tempSecondYellowCardSrc =
  'https://static.files.bbci.co.uk/core/website/assets/static/sport/football/second-yellow-card.face6badd0.svg';

const CardImage = styled.img`
  padding: 0 ${pixelsToRem(3.2)}rem;
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
  box-sizing: content-box;
`;

const Card = ({ player }) => (
  <CardContainer role="text">
    {player.actions[0].type === 'Red Card' ? (
      <StyledRedCard
        aria-hidden
        alt=""
        data-testid="red-card-img"
        src={tempRedCardSrc}
      />
    ) : (
      <StyledYellowCard
        aria-hidden
        alt=""
        data-testid="second-yellow-card-img"
        src={tempSecondYellowCardSrc}
      />
    )}
  </CardContainer>
);

export default Card;
