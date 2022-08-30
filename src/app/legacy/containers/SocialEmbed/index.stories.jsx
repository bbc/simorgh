import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';

import AmpDecorator from '../../../../../.storybook/helpers/ampDecorator';
import {
  twitterBlock,
  twitterBlockNoEmbed,
  instagramBlock,
  instagramBlockNoEmbed,
  youtubeBlockEmbed,
} from './common/fixtures';
import OptimoSocialEmbedContainer from '.';
import withContexts from './common/testHelper';

const Component = props =>
  withContexts(OptimoSocialEmbedContainer, {
    isEnabled: true,
    isAmp: props.isAmp,
    service: props.service,
    pageType: ARTICLE_PAGE,
  })(props);

export default {
  title: 'Containers/Social Embed/Optimo',
  Component,
  parameters: { chromatic: { disable: true } },
  decorators: [withKnobs, withServicesKnob()],
};

export const TwitterCanonicalExample = props => (
  <Component
    blocks={[twitterBlock]}
    source="https://twitter.com/BBCNews/status/1384138850478346243?s=20"
    {...props}
  />
);

export const TwitterAmpExample = props => (
  <Component
    isAmp
    blocks={[twitterBlock]}
    source="https://twitter.com/BBCNews/status/1384138850478346243?s=20"
    {...props}
  />
);
TwitterAmpExample.decorators = [AmpDecorator];

export const TwitterNoEmbed = props => (
  <Component
    blocks={[twitterBlockNoEmbed]}
    source="https://twitter.com/BBCNews/status/1384138850478346243?s=20"
    {...props}
  />
);

export const InstagramCanonicalExample = props => (
  <Component
    blocks={[instagramBlock]}
    source="https://www.instagram.com/p/CgNAEjOK46_"
    {...props}
  />
);

export const InstagramNoEmbed = props => (
  <Component
    blocks={[instagramBlockNoEmbed]}
    source="https://www.instagram.com/p/CgNAEjOK46_"
    {...props}
  />
);

export const YoutubeWithConsentBanner = props => (
  <Component
    blocks={[youtubeBlockEmbed]}
    source="https://www.youtube.com/watch?v=1e05_rwHvOM"
    {...props}
  />
);

export const YoutubeWithConsentBannerAmp = props => (
  <Component
    isAmp
    blocks={[youtubeBlockEmbed]}
    source="https://www.youtube.com/watch?v=1e05_rwHvOM"
    {...props}
  />
);
YoutubeWithConsentBannerAmp.decorators = [AmpDecorator];
