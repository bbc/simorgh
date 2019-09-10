import React from 'react';
import { storiesOf } from '@storybook/react';
import newsData from '../../../../data/news/frontpage';
import { FrontPageMain } from './index';
import { ServiceContextProvider } from '../../contexts/ServiceContext';

storiesOf('Containers|Front Page Main', module).add('Grid Layout', () => (
  <ServiceContextProvider service="news">
    <FrontPageMain frontPageData={newsData} />
  </ServiceContextProvider>
));
