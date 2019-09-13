import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

// eslint-disable-next-line react/prop-types
const TwitterEmbedContainer = ({ href }) => {
  // eslint-disable-next-line react/prop-types
  const tweetId = href.match(/[0-9]+$/g);
  return <TwitterTweetEmbed tweetId={tweetId[0]} />;
};

export default TwitterEmbedContainer;
