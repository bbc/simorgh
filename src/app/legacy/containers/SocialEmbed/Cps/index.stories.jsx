import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';

import AmpDecorator from '../../../../../../.storybook/helpers/ampDecorator';
import { cpsTwitterBlock, cpsTwitterBlockNoEmbed } from '../common/fixtures';
import CpsSocialEmbedContainer from '.';

import withContexts from '../common/testHelper';

const Component = props =>
  withContexts(CpsSocialEmbedContainer, {
    isEnabled: true,
    isAmp: props.isAmp,
    service: props.service,
  })(props);

export default {
  title: 'Containers/Social Embed/CPS',
  Component,
  parameters: { chromatic: { disable: true } },
  decorators: [withKnobs, withServicesKnob()],
};

export const CanonicalExample = props => (
  <Component
    blocks={[cpsTwitterBlock]}
    source="https://twitter.com/MileyCyrus/status/1237210910835392512"
    {...props}
  />
);

export const AmpExample = props => (
  <Component
    isAmp
    blocks={[cpsTwitterBlock]}
    source="https://twitter.com/MileyCyrus/status/1237210910835392512"
    {...props}
  />
);
AmpExample.decorators = [AmpDecorator];

export const NoEmbed = props => (
  <Component
    blocks={[cpsTwitterBlockNoEmbed]}
    source="https://twitter.com/MileyCyrus/status/1237210910835392512"
    {...props}
  />
);
