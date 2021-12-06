import React from 'react';
import SingleCard from '.';

export default {
  title: 'SingleCard',
  component: SingleCard,
};

export const Primary = () => (
  <SingleCard
    title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor purus blandit, sagittis enim in, placerat tortor."
    href="https://www.bbc.co.uk/"
    dir="ltr"
  />
);
