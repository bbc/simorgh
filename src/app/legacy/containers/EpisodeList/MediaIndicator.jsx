import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: inline-block;
  width: ${props => props.size};
  height: ${props => props.size};
`;

const MediaIndicator = ({ size }) => (
  <Wrapper
    aria-hidden="true"
    size={size}
    dangerouslySetInnerHTML={{
      __html: `
      <svg class="rounded-play-button" focusable="false" width=${size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <path class="rounded-play-button__inner" fill="transparent" d="M20,0C8.971,0,0,8.972,0,20c0,11.028,8.972,20,20,20c11.029,0,20.002-8.972,20.002-20C40.002,8.972,31.028,0,20,0z
        M15.799,26.939V13.078l11.264,6.93L15.799,26.939z"/>
        <path class="rounded-play-button__ring" fill="currentColor" d="M20,40C8.971,40,0,31.028,0,20C0,8.972,8.971,0,20,0c11.029,0,20.002,8.972,20.002,20C40.002,31.028,31.028,40,20,40z
        M20,1.765C9.945,1.765,1.764,9.945,1.764,20S9.945,38.234,20,38.234c10.056,0,18.237-8.18,18.237-18.234S30.056,1.765,20,1.765z"/>
        <polygon class="rounded-play-button__triangle" fill="currentColor" points="15.799,26.939 27.062,20.008 15.799,13.078 "/>
      </svg>
      `,
    }}
  />
);

export default MediaIndicator;
