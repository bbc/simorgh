import React, { useContext, useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { string } from 'prop-types';
import OEmbed from '#app/components/OEmbed';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import { ServiceContext } from '#contexts/ServiceContext';

import twitter from './fixtures/twitter.json';
import youtube from './fixtures/youtube.json';
import instagram from './fixtures/instagram.json';

const SocialEmbed = ({ source, className }) => {
  const { service } = useContext(ServiceContext);
  const [embed, setEmbed] = useState(null);
  const [widgetUrl, setWidgetUrl] = useState(null);

  useEffect(() => {
    const getEmbedephantData = provider =>
      ({ twitter, youtube, instagram }[provider]);
    const getWidgetUrl = provider =>
      ({
        twitter: 'https://platform.twitter.com/widgets.js',
        youtube: null,
        instagram: 'https://platform.instagram.com/en_US/embeds.js',
      }[provider]);
    setWidgetUrl(getWidgetUrl(source));
    setEmbed(getEmbedephantData(source));
  }, [source]);

  return embed ? (
    <GridItemConstrainedMedium className={className}>
      {widgetUrl && (
        <Helmet>
          <script async="" src={widgetUrl} />
        </Helmet>
      )}
      <OEmbed service={service} {...embed} />
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
