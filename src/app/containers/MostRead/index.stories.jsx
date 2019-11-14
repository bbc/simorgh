import React from 'react';
import { storiesOf } from '@storybook/react';
import AMPMostReadContainer from './Amp';
import CanonicalMostReadContainer from './Canonical';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

const stories = storiesOf('Containers|MostRead', module).addParameters({
  chromatic: { disable: true },
});

stories.add('Canonical Most Read', () => (
  <RequestContextProvider
    bbcOrigin="/new/articles/c0000000000o"
    id="c0000000000o"
    isAmp={false}
    pageType="article"
    service="news"
    statusCode={200}
    pathname="/news"
    variant={null}
  >
    <ServiceContextProvider service="news" variant={null}>
      <CanonicalMostReadContainer endpoint="/most_read.json" />
    </ServiceContextProvider>
  </RequestContextProvider>
));

stories.addDecorator(AmpDecorator).add('Amp Most Read', () => (
  <RequestContextProvider
    bbcOrigin="/new/articles/c0000000000o"
    id="c0000000000o"
    isAmp
    pageType="article"
    service="news"
    statusCode={200}
    pathname="/news"
    variant={null}
  >
    <ServiceContextProvider service="news" variant={null}>
      <AMPMostReadContainer endpoint="/most_read.json" />
    </ServiceContextProvider>
  </RequestContextProvider>
));
