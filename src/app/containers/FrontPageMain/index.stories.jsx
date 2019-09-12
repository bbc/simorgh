import React from 'react';
import { storiesOf } from '@storybook/react';
import newsData from '../../../../data/news/frontpage';
import FrontPageMain from '.';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { ToggleContextProvider } from '../../contexts/ToggleContext';

storiesOf('Containers|Front Page Main', module).add('Grid Layout', () => (
  <ToggleContextProvider>
    <ServiceContextProvider service="news">
      <FrontPageMain frontPageData={newsData} />
    </ServiceContextProvider>
  </ToggleContextProvider>
));
