import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

import { twitterBlock, twitterBlockNoEmbed } from './fixtures';
import withContexts from './helper.jsx';
import SocialEmbedContainer from '.';

storiesOf('Containers|Social Embed/Canonical', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add('default', ({ service }) =>
    withContexts(SocialEmbedContainer, {
      isAmp: false,
      isEnabled: true,
      service,
    })({
      blocks: [twitterBlock],
    }),
  )
  .add('no embed', ({ service }) =>
    withContexts(SocialEmbedContainer, {
      isAmp: false,
      isEnabled: true,
      service,
    })({
      blocks: [twitterBlockNoEmbed],
    }),
  );

storiesOf('Containers|Social Embed/AMP', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .addDecorator(AmpDecorator)
  .add('default', ({ service }) =>
    withContexts(SocialEmbedContainer, {
      isAmp: true,
      isEnabled: true,
      service,
    })({
      blocks: [twitterBlock],
    }),
  );
