import React from 'react';
import styled from '@emotion/styled';
import SingleCard from './SingleCard';

const Scroll = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  white-space: nowrap;
  overflow-x: scroll;

  /* Avoid using smooth scrolling as it causes accessibility issues */
  scroll-behavior: auto;
  -webkit-overflow-scrolling: touch;

  /* Hide scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollablePromo = () => {
  return <Scroll></Scroll>;
};

export default ScrollablePromo;
