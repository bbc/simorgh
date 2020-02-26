import React, { useContext, useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { string } from 'prop-types';
import OEmbed from '#app/components/OEmbed';
import AmpSocialEmbed from '#app/components/AmpSocialEmbed';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import { RequestContext } from '#contexts/RequestContext';

import twitter from './fixtures/twitter.json';
import youtube from './fixtures/youtube.json';
import instagram from './fixtures/instagram.json';

const SocialEmbedContainer = ({ className, source, id }) => {
  const { isAmp } = useContext(RequestContext);

  const getWidgetUrl = provider =>
    ({
      twitter: 'https://platform.twitter.com/widgets.js',
      youtube: null,
      instagram: 'https://platform.instagram.com/en_US/embeds.js',
    }[provider]);

  const [embed, setEmbed] = useState(null);
  useEffect(() => {
    const getEmbedephantData = provider =>
      ({ twitter, youtube, instagram }[provider]);
    if (!isAmp) setEmbed(getEmbedephantData(source));
  }, [isAmp, source]);

  return (
    <GridItemConstrainedMedium className={className}>
      {isAmp && <AmpSocialEmbed source={source} id={id} />}

      {!isAmp && embed && (
        <>
          <Helmet>
            <script async src={getWidgetUrl(source)} />
          </Helmet>
          <OEmbed {...embed} />
        </>
      )}
    </GridItemConstrainedMedium>
  );
};

SocialEmbedContainer.defaultProps = {
  className: '',
};

SocialEmbedContainer.propTypes = {
  source: string.isRequired,
  id: string.isRequired,
  className: string,
};

export default SocialEmbedContainer;
