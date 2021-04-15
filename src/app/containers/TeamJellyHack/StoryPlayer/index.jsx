import React, { useState } from 'react';
import StoryPromo from '#components/TeamJellyHack/StoryPromo';
import StoryNav from '#components/TeamJellyHack/StoryNav';

const StoryPlayer = ({ data }) => {
  const currentPage = useState(0);
  // container
  // close button
  // nav
  // StoryPromo - data.stories[currentPage]
  return (
    <StoryPromo {...data.stories[currentPage]} />
  );
};

export default StoryPlayer;
