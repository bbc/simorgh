import React from 'react';
import { storiesOf } from '@storybook/react';
import AMPMostReadContainer from './Amp';
import CanonicalMostReadContainer from './Canonical';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

const renderMostReadContainer = (container, isAmp) => (
  <RequestContextProvider
    bbcOrigin="/new/articles/c0000000000o"
    id="c0000000000o"
    isAmp={isAmp}
    pageType="article"
    service="news"
    statusCode={200}
    pathname="/news"
    variant={null}
  >
    <ServiceContextProvider service="news" variant={null}>
      {container}
    </ServiceContextProvider>
  </RequestContextProvider>
);

const stories = storiesOf('Containers|MostRead', module).addParameters({
  chromatic: { disable: true },
});

stories.add('Canonical Most Read', () =>
  renderMostReadContainer(
    <CanonicalMostReadContainer endpoint="/most_read.json" />,
    false,
  ),
);

stories
  .addDecorator(AmpDecorator)
  .add('Amp Most Read', () =>
    renderMostReadContainer(
      <AMPMostReadContainer endpoint="/most_read.json" />,
      true,
    ),
  );
