import React from 'react';
import styled from 'styled-components';

const Icon = styled.span`
  display: block;
  height: 20px;
  width: 20px;
`;

export default ({ isOpen }) => (
  <Icon
    className={['icon', ...(isOpen ? ['is-open'] : [])].join(' ')}
    dangerouslySetInnerHTML={{
      __html: `
        <svg
          stroke="currentColor"
          fill="none"
          stroke-width="0"
          viewBox="0 0 24 24"
          height="20px"
          width="20px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 15l7-7 7 7"
          ></path>
        </svg>
        `,
    }}
  />
);
