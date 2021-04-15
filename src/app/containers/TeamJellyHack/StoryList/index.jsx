import React from 'react';
import styled from '@emotion/styled';


const StoryItem = ({ id, name, src, hasViewed }) => {
  return (
    <li id={id} className={hasViewed && 'has-viewed'}>
      <img src={src} alt={name} />
      <h4>{name}</h4>
    </li>
  );
};

const StoryList = ({ data }) => {
  const topics = data.map(({ id, name, src, hasViewed }) => {
    return (
      <StoryItem key={id} id={id} name={name} src={src} hasViewed={hasViewed} />
    );
  });

  return <ol>{topics}</ol>;
};

export default StoryList;
