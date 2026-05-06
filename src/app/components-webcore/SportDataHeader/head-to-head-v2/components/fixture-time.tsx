// import React from 'react';
// import styled, { css } from '@bbc/web-styled';
import styled from '@emotion/styled';
// import { css } from '@emotion/react';

interface TimeProps {
  time: {
    displayTimeUK: string;
    accessibleTime: string;
  };
  isConciseView?: boolean;
}

const Time = ({ time }: TimeProps) => (
  <>
    <StyledTime aria-hidden="true" isConciseView={isConciseView}>
      {time.displayTimeUK}
    </StyledTime>
    <VisuallyHiddenText>{time.accessibleTime}</VisuallyHiddenText>
  </>
);

export default Time;
