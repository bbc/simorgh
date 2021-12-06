import React from 'react';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import ScrollablePromo from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import data from './testData.json';

// eslint-disable-next-line react/prop-types
const ScrollablePromoComponent = ({ service, script, dir }) => (
  <ServiceContextProvider service={service} script={script} dir={dir}>
    <ScrollablePromo data={data} />
  </ServiceContextProvider>
);

export default {
  title: 'components/scrollable promo component',
  ScrollablePromoComponent,
  decorators: [withKnobs, withServicesKnob()],
};

export const Default = props => <ScrollablePromoComponent {...props} />;
