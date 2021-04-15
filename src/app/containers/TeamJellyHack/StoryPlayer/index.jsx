import React from 'react';

// const StoryArticle = ({ src, title, description, href }) => {
//   return (<img src={src}>);
// });

const StoryPlayer = ({ data }) => {
  const stories = data.map(({ src, title, description, href }) => {
    return (
      <StoryArticle
        key={id}
      />
    );
  });

  return <div>{stories}</div>;
};

export default StoryPlayer;
