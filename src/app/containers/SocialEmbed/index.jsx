import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import OEmbed from '#app/components/OEmbed';
import { GridItemConstrainedMedium } from '#lib/styledGrid';

import twitter from './fixtures/twitter.json';

const SocialEmbed = ({ source, className }) => {
  const [embed, setEmbed] = useState(null);

  useEffect(() => {
    const getEmbedephantData = provider => ({ twitter }[provider]);
    setEmbed(getEmbedephantData(source));
  }, [source]);

  return embed ? (
    <GridItemConstrainedMedium className={className}>
      <OEmbed {...embed} />
    </GridItemConstrainedMedium>
  ) : null;
};

SocialEmbed.defaultProps = {
  className: '',
};

SocialEmbed.propTypes = {
  source: string.isRequired,
  className: string,
};

export default SocialEmbed;
