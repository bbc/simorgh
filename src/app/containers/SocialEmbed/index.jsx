import React, { useContext, useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { string } from 'prop-types';
import OEmbed from '#app/components/OEmbed';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';

import twitter from './fixtures/twitter.json';
import youtube from './fixtures/youtube.json';
import instagram from './fixtures/instagram.json';

const SocialEmbed = ({ source, className }) => {
  const { service } = useContext(ServiceContext);
  const { isAmp } = useContext(RequestContext);
  const [embed, setEmbed] = useState(null);
  const [widgetUrl, setWidgetUrl] = useState(null);

  useEffect(() => {
    const getEmbedephantData = provider =>
      ({ twitter, youtube, instagram }[provider]);
    const getWidgetUrl = provider =>
      ({
        twitter: isAmp
          ? 'https://cdn.ampproject.org/v0/amp-twitter-0.1.js'
          : 'https://platform.twitter.com/widgets.js',
        youtube: isAmp
          ? 'https://cdn.ampproject.org/v0/amp-youtube-0.1.js'
          : null,
        instagram: isAmp
          ? 'https://cdn.ampproject.org/v0/amp-instagram-0.1.js'
          : null,
      }[provider]);
    setWidgetUrl(getWidgetUrl(source));
    setEmbed(getEmbedephantData(source));
  }, [isAmp, source]);

  const ampAttribute = isAmp && { 'custom-element': `amp-${source}` };

  return embed ? (
    <GridItemConstrainedMedium className={className}>
      {widgetUrl && (
        <Helmet>
          <script async="" {...ampAttribute} src={widgetUrl} />
        </Helmet>
      )}
      {isAmp ? (
        <amp-twitter
          width="375"
          height="472"
          layout="responsive"
          data-tweetid="1164036827667238912"
        />
      ) : (
        <OEmbed service={service} {...embed} />
      )}
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
