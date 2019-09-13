import React from 'react';
import { FacebookProvider, EmbeddedPost } from 'react-facebook';

// eslint-disable-next-line react/prop-types
const FacebookEmbedContainer = ({ href }) => {
  return (
    <FacebookProvider appId={123456789}>
      <EmbeddedPost href={href} width="500" />
    </FacebookProvider>
  );
};

export default FacebookEmbedContainer;
