import React from 'react';
import { css } from '@emotion/react';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { GREY_2 } from '../../../components/ThemeProvider/palette';

import AmpDecorator from '../../../../../.storybook/helpers/ampDecorator';
import {
  twitterBlock,
  twitterBlockNoEmbed,
  instagramBlock,
  instagramBlockNoEmbed,
  youtubeBlockEmbed,
  tiktokBlockEmbed,
  facebookPostBlockEmbed,
  facebookVideoBlockEmbed,
} from './common/fixtures';
import OptimoSocialEmbedContainer from '.';
import withContexts from './common/testHelper';

const BackgroundColorWrapper = ({ children }) => (
  <div css={css({ backgroundColor: GREY_2, padding: 20 })}>{children}</div>
);

const SocialEmbedComponentWithTheme = props => (
  <BackgroundColorWrapper>
    <OptimoSocialEmbedContainer {...props} />
  </BackgroundColorWrapper>
);

const Component = props =>
  withContexts(SocialEmbedComponentWithTheme, {
    isEnabled: true,
    isAmp: props.isAmp,
    service: props.service,
    pageType: ARTICLE_PAGE,
  })(props);

export default {
  title: 'Containers/Social Embed/Optimo',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const TwitterCanonicalExample = (_, { service }) => (
  <Component
    blocks={[twitterBlock]}
    source="https://twitter.com/BBCNews/status/1384138850478346243?s=20"
    service={service}
  />
);

export const TwitterAmpExample = (_, { service }) => (
  <Component
    isAmp
    blocks={[twitterBlock]}
    source="https://twitter.com/BBCNews/status/1384138850478346243?s=20"
    service={service}
  />
);
TwitterAmpExample.decorators = [AmpDecorator];

export const TwitterNoEmbed = (_, { service }) => (
  <Component
    blocks={[twitterBlockNoEmbed]}
    source="https://twitter.com/BBCNews/status/1384138850478346243?s=20"
    service={service}
  />
);

export const InstagramCanonicalExample = (_, { service }) => (
  <Component
    blocks={[instagramBlock]}
    source="https://www.instagram.com/p/CgNAEjOK46_"
    service={service}
  />
);

export const InstagramNoEmbed = (_, { service }) => (
  <Component
    blocks={[instagramBlockNoEmbed]}
    source="https://www.instagram.com/p/CgNAEjOK46_"
    service={service}
  />
);

export const TikTokWithConsentBanner = (_, { service }) => (
  <Component
    blocks={[tiktokBlockEmbed]}
    source="https://www.tiktok.com/@cuppymusic/video/7086167423639997701"
    service={service}
  />
);

export const TikTokWithConsentBannerAmp = (_, { service }) => (
  <Component
    isAmp
    blocks={[tiktokBlockEmbed]}
    source="https://www.tiktok.com/@cuppymusic/video/7086167423639997701"
    service={service}
  />
);
TikTokWithConsentBannerAmp.decorators = [AmpDecorator];

export const YoutubeWithConsentBanner = (_, { service }) => (
  <Component
    blocks={[youtubeBlockEmbed]}
    source="https://www.youtube.com/watch?v=1e05_rwHvOM"
    service={service}
  />
);

export const YoutubeWithConsentBannerAmp = (_, { service }) => (
  <Component
    isAmp
    blocks={[youtubeBlockEmbed]}
    source="https://www.youtube.com/watch?v=1e05_rwHvOM"
    service={service}
  />
);
YoutubeWithConsentBannerAmp.decorators = [AmpDecorator];

export const FacebookPostCanonicalExample = (_, { service }) => (
  <Component
    blocks={[facebookPostBlockEmbed]}
    source="https://www.facebook.com/RickAstley/posts/545713756920775"
    service={service}
  />
);

export const FacebookPostAmpExample = (_, { service }) => (
  <Component
    isAmp
    blocks={[facebookPostBlockEmbed]}
    source="https://www.facebook.com/RickAstley/posts/545713756920775"
    service={service}
  />
);
FacebookPostAmpExample.decorators = [AmpDecorator];

export const FacebookVideoCanonicalExample = (_, { service }) => (
  <Component
    blocks={[facebookVideoBlockEmbed]}
    source="https://www.facebook.com/RickAstley/videos/1378590239249667"
    service={service}
  />
);

export const FacebookVideoAmpExample = (_, { service }) => (
  <Component
    isAmp
    blocks={[facebookVideoBlockEmbed]}
    source="https://www.facebook.com/RickAstley/videos/1378590239249667"
    service={service}
  />
);
FacebookVideoAmpExample.decorators = [AmpDecorator];
