import React from 'react';
import { storiesOf } from '@storybook/react';
import Title from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';

const stories = storiesOf('Containers|StoryPromoGroups/Title', module);

stories.add(`StoryPromoGroups - Title`, () => (
  <ToggleContextProvider>
    <ServiceContextProvider service="igbo">
      <Title>This is a title</Title>
    </ServiceContextProvider>
  </ToggleContextProvider>
));
