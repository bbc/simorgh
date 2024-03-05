import React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import ThemeProvider from '../ThemeProvider';
import Header from '../../../../ws-nextjs-app/pages/[service]/live/[id]/Header';
// import MessageBanner from '.';
import { StoryProps } from '../../models/types/storybook';

interface Props extends StoryProps {
  text?: string;
  longText?: string;
}

const Component = ({ service, variant }: Props) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <Header
          showLiveLabel={true}
          title={'Би-Би-Си ТВ жаңылыктары'}
          description={
            'Би-Би-Си Кыргыз кызматынын эл аралык жаңылыктарын көрүңүз.'
          }
          imageUrl="https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
          imageUrlTemplate="https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
          imageWidth={660}
        />
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export default {
  title: 'New Components/MessageBanner',
  Component,
  decorators: [withKnobs, withServicesKnob()],
};

export const Example = Component;
