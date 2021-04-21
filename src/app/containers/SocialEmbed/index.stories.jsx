import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

import { twitterBlock, twitterBlockNoEmbed } from './utilities/fixtures';
import withContexts from './utilities/testHelper';
import CpsSocialEmbedContainer from '.';

storiesOf('Containers/Social Embed/Canonical', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add('default', ({ service }) =>
    withContexts(CpsSocialEmbedContainer, {
      isAmp: false,
      isEnabled: true,
      service,
    })({
      blocks: [twitterBlock],
    }),
  )
  .add('no embed', ({ service }) =>
    withContexts(CpsSocialEmbedContainer, {
      isAmp: false,
      isEnabled: true,
      service,
    })({
      blocks: [twitterBlockNoEmbed],
    }),
  );

storiesOf('Containers/Social Embed/AMP', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .addDecorator(AmpDecorator)
  .add('default', ({ service }) =>
    withContexts(CpsSocialEmbedContainer, {
      isAmp: true,
      isEnabled: true,
      service,
    })({
      blocks: [twitterBlock],
    }),
  );
