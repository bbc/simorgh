import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import IndexHeadingContainer from '.';

storiesOf('Containers|Index Heading', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add('default', ({ script, service }) => (
    <IndexHeadingContainer script={script} service={service}>
      Index Heading
    </IndexHeadingContainer>
  ));
