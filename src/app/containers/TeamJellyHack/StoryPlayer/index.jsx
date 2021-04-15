import React from 'react';

const StoryPlayer = ({ data }) => {
  const stories = data.map(({ src, title, description, href }) => {
    return (
      <StoryPromo
        key={id}
      />
    );
  });

  return <div>{stories}</div>;
};

export default StoryPlayer;
