import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

import { cpsTwitterBlock, cpsTwitterBlockNoEmbed } from './common/fixtures';
import withContexts from './common/testHelper';
import CpsSocialEmbedContainer from '.';

storiesOf('Containers/CPS Social Embed/Canonical', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add('default', ({ service }) =>
    withContexts(CpsSocialEmbedContainer, {
      isAmp: false,
      isEnabled: true,
      service,
    })({
      blocks: [cpsTwitterBlock],
    }),
  )
  .add('no embed', ({ service }) =>
    withContexts(CpsSocialEmbedContainer, {
      isAmp: false,
      isEnabled: true,
      service,
    })({
      blocks: [cpsTwitterBlockNoEmbed],
    }),
  );

storiesOf('Containers/CPS Social Embed/AMP', module)
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
      blocks: [cpsTwitterBlock],
    }),
  );
