import React, { PropsWithChildren } from 'react';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';

import { RequestContextProvider } from '../../contexts/RequestContext';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { StoryProps } from '../../models/types/storybook';
import ThemeProvider from '../ThemeProvider';

import Promo from '.';
import {
  cpsPromoFixture,
  linkPromoFixture,
  cpsNewsPromoFixture,
} from './fixtures';

const Wrappers = ({
  service,
  variant,
  children,
}: PropsWithChildren<StoryProps>) => {
  return (
    <ThemeProvider service={service}>
      <ServiceContextProvider service={service} variant={variant}>
        <RequestContextProvider
          pageType="article"
          pathname="/news/articles/c000000000o"
          isAmp={false}
          isApp={false}
          service={service}
        >
          <ToggleContextProvider
            toggles={{
              eventTracking: { enabled: false },
            }}
          >
            {children}
          </ToggleContextProvider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

const Component = (props: StoryProps, { args }: any) => {
  const imageUrl = args?.imageUrl;
  const mainBody = args?.mainBody;
  const minimumContrast = args?.minContrast;
  const paletteSize = args?.paletteSize;
  return (
    <Wrappers {...props}>
      <Promo
        // @ts-expect-error - passing in partial data
        image={{ src: imageUrl, alt: '', width: 500, height: 250, ratio: 52 }}
        url="#"
        minimumContrast={minimumContrast}
        paletteSize={paletteSize}
      >
        {mainBody}
      </Promo>
    </Wrappers>
  );
};

const WithCPSPromoData = (props: StoryProps) => {
  return (
    <Wrappers {...props}>
      <Promo {...cpsPromoFixture} />
    </Wrappers>
  );
};

const WithNewsCPSPromoData = (props: StoryProps) => {
  return (
    <Wrappers {...props}>
      <Promo {...cpsNewsPromoFixture} />
    </Wrappers>
  );
};

const WithLinkPromoData = (props: StoryProps) => {
  return (
    <Wrappers {...props}>
      <Promo {...linkPromoFixture} />
    </Wrappers>
  );
};

export default {
  title: 'New Components/Frosted Glass Promo',
  Component,
  argTypes: {
    imageUrl:
      'https://ichef.bbci.co.uk/ace/ws/976/cpsprodpb/189F/production/_121530360_hi071904982.jpg',
    mainBody:
      'Man City vs West Ham: Bad weather force Premier League to cancel Sunday match',
    minContrast: 8,
    paletteSize: {
      control: {
        type: 'range',
        min: 2,
        max: 99,
        step: 1,
      },
    },
  },
};

export const Standalone = Component;
export const CPSPromo = WithCPSPromoData;
export const CPSNewsPromo = WithNewsCPSPromoData;
export const LinkPromo = WithLinkPromoData;
