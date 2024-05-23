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

export const TwitterCanonicalExample = (_, globalArgs) => (
  <Component
    blocks={[twitterBlock]}
    source="https://twitter.com/BBCNews/status/1384138850478346243?s=20"
    {...globalArgs}
  />
);

export const TwitterAmpExample = (_, globalArgs) => (
  <Component
    isAmp
    blocks={[twitterBlock]}
    source="https://twitter.com/BBCNews/status/1384138850478346243?s=20"
    {...globalArgs}
  />
);
TwitterAmpExample.decorators = [AmpDecorator];

export const TwitterNoEmbed = (_, globalArgs) => (
  <Component
    blocks={[twitterBlockNoEmbed]}
    source="https://twitter.com/BBCNews/status/1384138850478346243?s=20"
    {...globalArgs}
  />
);

export const InstagramCanonicalExample = (_, globalArgs) => (
  <Component
    blocks={[instagramBlock]}
    source="https://www.instagram.com/p/CgNAEjOK46_"
    {...globalArgs}
  />
);

export const InstagramNoEmbed = (_, globalArgs) => (
  <Component
    blocks={[instagramBlockNoEmbed]}
    source="https://www.instagram.com/p/CgNAEjOK46_"
    {...globalArgs}
  />
);

export const TikTokWithConsentBanner = (_, globalArgs) => (
  <Component
    blocks={[tiktokBlockEmbed]}
    source="https://www.tiktok.com/@cuppymusic/video/7086167423639997701"
    {...globalArgs}
  />
);

export const TikTokWithConsentBannerAmp = (_, globalArgs) => (
  <Component
    isAmp
    blocks={[tiktokBlockEmbed]}
    source="https://www.tiktok.com/@cuppymusic/video/7086167423639997701"
    {...globalArgs}
  />
);
TikTokWithConsentBannerAmp.decorators = [AmpDecorator];

export const YoutubeWithConsentBanner = (_, globalArgs) => (
  <Component
    blocks={[youtubeBlockEmbed]}
    source="https://www.youtube.com/watch?v=1e05_rwHvOM"
    {...globalArgs}
  />
);

export const YoutubeWithConsentBannerAmp = (_, globalArgs) => (
  <Component
    isAmp
    blocks={[youtubeBlockEmbed]}
    source="https://www.youtube.com/watch?v=1e05_rwHvOM"
    {...globalArgs}
  />
);
YoutubeWithConsentBannerAmp.decorators = [AmpDecorator];

export const FacebookPostCanonicalExample = (_, globalArgs) => (
  <Component
    blocks={[facebookPostBlockEmbed]}
    source="https://www.facebook.com/RickAstley/posts/545713756920775"
    {...globalArgs}
  />
);

export const FacebookPostAmpExample = (_, globalArgs) => (
  <Component
    isAmp
    blocks={[facebookPostBlockEmbed]}
    source="https://www.facebook.com/RickAstley/posts/545713756920775"
    {...globalArgs}
  />
);
FacebookPostAmpExample.decorators = [AmpDecorator];

export const FacebookVideoCanonicalExample = (_, globalArgs) => (
  <Component
    blocks={[facebookVideoBlockEmbed]}
    source="https://www.facebook.com/RickAstley/videos/1378590239249667"
    {...globalArgs}
  />
);

export const FacebookVideoAmpExample = (_, globalArgs) => (
  <Component
    isAmp
    blocks={[facebookVideoBlockEmbed]}
    source="https://www.facebook.com/RickAstley/videos/1378590239249667"
    {...globalArgs}
  />
);
FacebookVideoAmpExample.decorators = [AmpDecorator];
