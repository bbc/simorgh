import React from 'react';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import styled from '@emotion/styled';
import { C_GREY_6 } from '@bbc/psammead-styles/dist/colours';
import ScrollablePromo from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import data from './testData.json';

const BackGround = styled.div`
  background-color: #f6f6f6;
  padding: 2rem;
`;
// eslint-disable-next-line react/prop-types
const ScrollablePromoComponent = ({ service, script, dir }) => (
  <BackGround>
    <ServiceContextProvider service={service} script={script} dir={dir}>
      <ScrollablePromo blocks={data} />
    </ServiceContextProvider>
  </BackGround>
);

export default {
  title: 'components/scrollable promo component',
  ScrollablePromoComponent,
  decorators: [withKnobs, withServicesKnob()],
};

export const Default = props => <ScrollablePromoComponent {...props} />;
