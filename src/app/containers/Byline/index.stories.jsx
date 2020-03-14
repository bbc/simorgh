import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import BylineContainer from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';

const stories = storiesOf('Containers|Byline', module)
  .addParameters({
    chromatic: { disable: true },
  })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob());

stories.add('default', ({ service }) => {
  const blocks = [
    { name: text('name', 'John Smith'), title: text('title', 'Art Editor') },
  ];
  return (
    <ServiceContextProvider service={service}>
      <RequestContextProvider
        isAmp={false}
        pageType="STY"
        service={service}
        statusCode={200}
        bbcOrigin="https://www.test.bbc.com"
        pathname="/pathname"
      >
        <BylineContainer service={service} blocks={blocks} />
      </RequestContextProvider>
    </ServiceContextProvider>
  );
});
