import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

// eslint-disable-next-line react/prop-types
const TwitterEmbedContainer = ({ href }) => {
  return <TwitterTweetEmbed tweetId={href} />;
};

export default TwitterEmbedContainer;
