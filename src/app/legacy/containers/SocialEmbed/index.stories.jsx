import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';

import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import { twitterBlock, twitterBlockNoEmbed, instagramBlock, instagramBlockNoEmbed } from './common/fixtures';
import OptimoSocialEmbedContainer from '.';
import withContexts from './common/testHelper';

const Component = props =>
  withContexts(OptimoSocialEmbedContainer, {
    isEnabled: true,
    isAmp: props.isAmp,
    service: props.service,
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
    blocks={[instagramBlock]}
    source="https://www.instagram.com/p/CgNAEjOK46_"
    {...props}
  />
);