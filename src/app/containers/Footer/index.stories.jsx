import React from 'react';
import { storiesOf } from '@storybook/react';
import Footer from '.';
import services from '../../lib/config/services';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { dirDecorator } from '@bbc/psammead-storybook-helpers';
import { select, withKnobs } from '@storybook/addon-knobs';

const inputs = () => {
  // capitalization is only for presentation purpose on the knob
  const options = Object.keys(services)
    .filter(key => key !== 'BBC_BLOCKS')
    .map(key => key.charAt(0).toUpperCase() + key.slice(1));

  const serviceChoice = select('Service SVG', options, 'News').toLowerCase();

  return { serviceChoice };
};

// Object.keys(services)
//   .filter(service => service !== 'default')
//   .forEach(service => {
//     storiesOf('Footer', module)
//       .addDecorator(withKnobs)
//       .addDecorator(dirDecorator)
//       .add(service, () => (
//         <ServiceContextProvider service={service}>
//           <Footer />
//         </ServiceContextProvider>
//       ));
//   });
storiesOf('Footer', module)
  .addDecorator(withKnobs)
  .addDecorator(dirDecorator)
  .add('default', () => {
    const { serviceChoice } = inputs();

    return (
      <ServiceContextProvider service={serviceChoice}>
        <Footer />
      </ServiceContextProvider>
    );
  });
