import React from 'react';
import { storiesOf } from '@storybook/react';
import Title from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';

storiesOf('Containers|Index/Title', module)
  .add(`Index - Title`, () => (
    <ServiceContextProvider service="igbo">
      <Title>This is a title</Title>
    </ServiceContextProvider>
  ))
  .add(`Index - Visually Hidden Title`, () => (
    <ServiceContextProvider service="igbo">
      <Title isVisuallyHidden>This is a title</Title>
    </ServiceContextProvider>
  ));
