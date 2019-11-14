import React from 'react';
import { storiesOf } from '@storybook/react';
import AMPMostReadContainer from './index.amp.jsx';
import CanonicalMostReadContainer from './index.canonical.jsx';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

const stories = storiesOf('Containers|MostRead', module).addParameters({
  chromatic: { disable: true },
});

stories.add('Canonical Most Read', () => (
  <RequestContextProvider
    bbcOrigin={`http://localhost:7080/new/articles/c0000000000o`}
    id="c0000000000o"
    isAmp={false}
    pageType="article"
    service="news"
    statusCode={200}
    pathname={`/news`}
    variant={null}
  >
    <ServiceContextProvider service="news" variant="lat">
      <CanonicalMostReadContainer endpoint="/most_read.json" />
    </ServiceContextProvider>
  </RequestContextProvider>
));
