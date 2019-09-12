import React from 'react';
import { storiesOf } from '@storybook/react';
import newsData from '../../../../data/news/frontpage';
import FrontPageMain from '.';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import { RequestContextProvider } from '../../contexts/RequestContext';

storiesOf('Containers|Main|Front Page', module).add('Front Page Main', () => (
  <ToggleContextProvider>
    <ServiceContextProvider service="news">
      <RequestContextProvider isAmp={false} pageType="frontPage" service="news">
        <FrontPageMain frontPageData={newsData} />
      </RequestContextProvider>
    </ServiceContextProvider>
  </ToggleContextProvider>
));
