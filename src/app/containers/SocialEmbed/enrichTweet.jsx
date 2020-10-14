import { useEffect } from 'react';
import { shape } from 'prop-types';
import socialEmbedBlockPropTypes from '#models/propTypes/socialEmbed';

const EnrichTweet = ({ children }) => {
  useEffect(() => {
    if (window.twttr) {
      window.twttr.widgets.load();
    }
  }, []);

  return children;
};

export default EnrichTweet;

EnrichTweet.propTypes = {
  children: shape(socialEmbedBlockPropTypes),
};
