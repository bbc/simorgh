import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import IndexHeadingContainer from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';

storiesOf('Containers|Index Heading', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add('default', ({ service }) => (
    <ServiceContextProvider service={service}>
      <IndexHeadingContainer>Index Heading</IndexHeadingContainer>
    </ServiceContextProvider>
  ));
