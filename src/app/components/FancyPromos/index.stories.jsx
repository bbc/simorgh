import React from 'react';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import {
  withKnobs,
  text,
  boolean,
  number,
  select,
} from '@storybook/addon-knobs';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';

import FancyPromo from './FancyPromo';
import FancyPromo3 from './FancyPromo3';
import withImageAnalyser from './withImageAnalyser';

const Debug = withImageAnalyser(() => null);

// eslint-disable-next-line react/prop-types
const Component = ({ service, variant }) => {
  const imageUrl = text(
    'Image URL',
    'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/newscms/2016_02/1374066/160112-obama-1101p.jpg',
  );
  const mainBody = text(
    'Main Body',
    'Assembly election 2021: Who will win in West Bengal, Assam, Kerala and Tamil Nadu',
  );
  const date = text('Metadata', 'April 9, 2021');
  const flipImage = boolean('Flip Image', true);
  const backgroundColour = select(
    'Background Colour',
    {
      Vibrant: 'Vibrant',
      // VibrantHighContrast: '',
      LightVibrant: 'LightVibrant',
      // LightVibrantHighContrast: '',
      DarkVibrant: 'DarkVibrant',
      //DarkVibrantHighContrast: '',
      Muted: 'Muted',
      // MutedHighContrast: '',
      LightMuted: 'LightMuted',
      // LightMutedHighContrast: '',
      DarkMuted: 'DarkMuted',
      // DarkMutedHighContrast: '',
      ChameleonGrey8: 'ChameleonGrey8',
    },
    'DarkMuted',
  );
  const backgroundOpacity = number('Background Opacity (0-100)', 50, {
    min: 0,
    max: 100,
  });
  const blurRadius = number('Blur Radius (0-30)', 10, { min: 0, max: 30 });
  const textShadow = boolean('Text Shadow', false);
  return (
    <ServiceContextProvider service={service} variant={variant}>
      <RequestContextProvider isAmp={false} service={service}>
        <FancyPromo
          image={imageUrl}
          meta={date}
          blurRadius={blurRadius}
          flipImage={flipImage}
          textShadow={textShadow}
          backgroundColour={backgroundColour}
          backgroundOpacity={backgroundOpacity}
          debug={false}
        >
          {mainBody}
        </FancyPromo>

        <FancyPromo3
          image={imageUrl}
          meta={date}
          blurRadius={blurRadius}
          flipImage={flipImage}
          textShadow={textShadow}
          backgroundColour={backgroundColour}
          backgroundOpacity={backgroundOpacity}
        >
          {mainBody}
        </FancyPromo3>
        <Debug debug image={imageUrl} />
      </RequestContextProvider>
    </ServiceContextProvider>
  );
};

export default {
  title: 'Fancy Promos',
  Component,
  decorators: [withKnobs, withServicesKnob()],
};

export const SoFancy = Component;
