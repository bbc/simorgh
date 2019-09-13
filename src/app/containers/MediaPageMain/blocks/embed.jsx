import React from 'react';
import Facebook from './facebookEmbed';
import Twitter from './twitterEmbed';

const embedkMap = {
  facebook: Facebook,
  twitter: Twitter,
};

// eslint-disable-next-line react/prop-types
const SocialEmbedContainer = ({ source, href }) => {
  const Embed = embedkMap[source];
  return <Embed crc href={href} />;
};

export default SocialEmbedContainer;
