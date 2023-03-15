/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */
import React, { memo, useEffect } from 'react';
import styled from '@emotion/styled';
import { SocialEmbedProviders } from '#app/models/types/global';
import useScript from './useScript';

const LANDSCAPE_RATIO = '56.25%';
const PRE_RENDER_MARGIN = '10rem';

/**
 * Apply provider-specific styles.
 */
const OEmbed = styled.div`
  ${({ styles }: { styles: string }) => styles}
  display: flex;
  justify-content: center;
`;

const getOnRenderError = (providerName: string) =>
  `onRender callback function not implemented for ${providerName}`;

/**
 * The following object declares a list of supported Canonical providers
 * and their attributes. Not all providers have the same attributes.
 */
export const providers = (provider: SocialEmbedProviders) =>
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
        // @ts-ignore
        if (window.instgrm) {
          // @ts-ignore
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
        // @ts-ignore
        if (window.twttr) {
          // @ts-ignore
          window.twttr.widgets.load();
        }
      },
      onLibraryLoad: (onRender: () => void) => {
        // @ts-ignore
        window.twttr.ready(twttr => {
          twttr.events.bind('rendered', onRender);
        });
      },
    },
    youtube: {
      script: '',
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
      enrich: () => null,
      onLibraryLoad: () => console.error(getOnRenderError('YouTube')),
    },
    tiktok: {
      script: `https://www.tiktok.com/embed.js?t=${Date.now()}`,
      styles: `      
      .tiktok-embed{
        margin-top: 0;
        margin-bottom: 0;
      }
    `,
      enrich: () => null,
      onLibraryLoad: () => console.error(getOnRenderError('TikTok')),
    },
    facebook: {
      script: 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v15.0',
      styles: `      
      position: relative;
      overflow: hidden;

      .fb_iframe_widget {
        position: unset;

        > span {
          position: unset;
        }
      }

      iframe {
        background-color: white;
        left:0;
        top:0;
        height:100% !important;
        width:100% !important;
        position:absolute !important;
      }
    `,
      enrich: () => null,
      onLibraryLoad: () => console.error(getOnRenderError('Facebook')),
    },
  }[provider]);

type Props = {
  provider: SocialEmbedProviders;
  oEmbed: {
    html: string;
  };
  onRender?: () => void;
};

const CanonicalEmbed = ({ provider, oEmbed, onRender }: Props) => {
  const { script, styles, enrich, onLibraryLoad } = providers(provider);
  const hasLoadedLibrary = useScript(script);
  // @ts-ignore
  useEffect(enrich);

  useEffect(() => {
    if (onRender && hasLoadedLibrary && onLibraryLoad) {
      onLibraryLoad(onRender);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasLoadedLibrary]);

  return (
    <OEmbed styles={styles} dangerouslySetInnerHTML={{ __html: oEmbed.html }} />
  );
};

export default memo(CanonicalEmbed);
