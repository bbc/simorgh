import React from 'react';
import { storiesOf } from '@storybook/react';
import MostReadContainer from '.';
import services from '#server/utilities/serviceConfigs';
import { ServiceContextProvider } from '#contexts/ServiceContext';

const stories = storiesOf('Containers|MostRead', module).addParameters({
  chromatic: { disable: true },
});

stories.add(`default`, () => (
  <ServiceContextProvider service="news" variant="lat">
    <MostReadContainer />
  </ServiceContextProvider>
));
