import { useEffect } from 'react';
import { shape } from 'prop-types';
import socialEmbedBlockPropTypes from '#models/propTypes/socialEmbed';

const EnrichInstagram = ({ children }) => {
  useEffect(() => {
    if (window.instgrm) {
      instgrm.Embeds.process();
    }
  }, []);

  return children;
};

export default EnrichInstagram;

EnrichInstagram.propTypes = {
  children: shape(socialEmbedBlockPropTypes),
};
