import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';

<<<<<<< HEAD
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import { twitterBlock, twitterBlockNoEmbed } from './common/fixtures';
=======
import AmpDecorator from '../../../../../.storybook/helpers/ampDecorator';
import {
  twitterBlock,
  twitterBlockNoEmbed,
  instagramBlock,
  instagramBlockNoEmbed,
} from './common/fixtures';
>>>>>>> ce3f0331dd (restore storybook)
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

export const CanonicalExample = props => (
  <Component
    blocks={[twitterBlock]}
    source="https://twitter.com/BBCNews/status/1384138850478346243?s=20"
    {...props}
  />
);

export const AmpExample = props => (
  <Component
    isAmp
    blocks={[twitterBlock]}
    source="https://twitter.com/BBCNews/status/1384138850478346243?s=20"
    {...props}
  />
);
AmpExample.decorators = [AmpDecorator];

export const NoEmbed = props => (
  <Component
    blocks={[twitterBlockNoEmbed]}
    source="https://twitter.com/BBCNews/status/1384138850478346243?s=20"
    {...props}
  />
);
<<<<<<< HEAD
=======

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
>>>>>>> ce3f0331dd (restore storybook)
