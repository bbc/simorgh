import React from 'react';
import { storiesOf } from '@storybook/react';
import * as svgs from '@bbc/psammead-assets/svgs';
import { inputProvider } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import services from '../../lib/config/services';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import Brand from '.';

storiesOf('Brand', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    inputProvider(
      null,
      ({ service }) => {
        return (
          <ServiceContextProvider service={service}>
            <Brand
              product="BBC News"
              svg={svgs[service]}
              svgHeight={24}
              maxWidth={280}
              minWidth={180}
            />
          </ServiceContextProvider>
        );
      },
      Object.keys(services),
    ),
  );
