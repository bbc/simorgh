/* eslint-disable no-console */
import React, { memo, useEffect } from 'react';
import { func, shape, string } from 'prop-types';
import styled from '@emotion/styled';
import useScript from './useScript';

const LANDSCAPE_RATIO = '56.25%';
const PRE_RENDER_MARGIN = '10rem';
const TIKTOK_MAX_WIDTH = '325px';

/**
 * Apply provider-specific styles.
 */
const OEmbed = styled.div`
  ${({ styles }) => styles}
  display: flex;
  justify-content: center;
`;

const getOnRenderError = providerName =>
  `onRender callback function not implemented for ${providerName}`;

/**
 * The following object declares a list of supported Canonical providers
 * and their attributes. Not all providers have the same attributes.
 */
export const providers = provider =>
  ({
    instagram: {
      script: 'https://www.instagram.com/embed.js',
      styles: `
      .instagram-media {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        min-width: auto !important;
      }
    `,
      enrich: () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      },
      onLibraryLoad: () => console.error(getOnRenderError('Instagram')),
    },
    twitter: {
      script: 'https://platform.twitter.com/widgets.js',
      styles: `
      .twitter-tweet {
        margin-top: 0 !important;
        margin-bottom: ${PRE_RENDER_MARGIN} !important;
      }
      .twitter-tweet-rendered {
        margin-bottom: 0 !important;
      }
    `,
      enrich: () => {
        if (window.twttr) {
          window.twttr.widgets.load();
        }
      },
      onLibraryLoad: onRender => {
        window.twttr.ready(twttr => {
          twttr.events.bind('rendered', onRender);
        });
      },
    },
    youtube: {
      styles: `
      padding-top: ${LANDSCAPE_RATIO};
      position: relative;
      overflow: hidden;

      > iframe {
        border: none;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
      }
    `,
      enrich: () => {},
      onLibraryLoad: () => console.error(getOnRenderError('YouTube')),
    },
    tiktok: {
      script: `https://www.tiktok.com/embed.js?t=${Date.now()}`,
      styles: `
      max-width: ${TIKTOK_MAX_WIDTH};

      ~ figcaption {
        max-width: ${TIKTOK_MAX_WIDTH};
      }
      
      .tiktok-embed{
        margin-top: 0;
        margin-bottom: 0;

        > iframe {
          border-radius: 8px;
        }
      }
    `,
      enrich: () => {},
      onLibraryLoad: () => console.error(getOnRenderError('TikTok')),
    },
  }[provider]);

const CanonicalEmbed = ({ provider, oEmbed, onRender }) => {
  const { script, styles, enrich, onLibraryLoad } = providers(provider);
  const hasLoadedLibrary = useScript(script);

  useEffect(enrich);

  useEffect(() => {
    if (onRender && hasLoadedLibrary && onLibraryLoad) {
      onLibraryLoad(onRender);
    }
  }, [hasLoadedLibrary]);

  return (
    <OEmbed styles={styles} dangerouslySetInnerHTML={{ __html: oEmbed.html }} />
  );
};

CanonicalEmbed.propTypes = {
  provider: string.isRequired,
  oEmbed: shape({
    html: string.isRequired,
  }).isRequired,
  onRender: func,
};

CanonicalEmbed.defaultProps = {
  onRender: null,
};

export default memo(CanonicalEmbed);
