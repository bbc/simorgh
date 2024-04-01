import React, { PropsWithChildren } from 'react';

import { RequestContextProvider } from '../../contexts/RequestContext';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import { StoryProps } from '../../models/types/storybook';

import Promo from '.';
import {
  cpsPromoFixture,
  linkPromoFixture,
  cpsNewsPromoFixture,
} from './fixtures';

interface Props extends StoryProps {
  imageUrl: string;
  mainBody: string;
  minimumContrast: number;
  paletteSize: number;
}

const Wrappers = ({
  service = 'news',
  children,
}: PropsWithChildren<StoryProps>) => {
  return (
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
  );
};

const Component = (props: Props) => {
  const { imageUrl, mainBody, minimumContrast, paletteSize } = props;
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
  title: 'Components/Frosted Glass Promo',
  Component,
  args: {
    imageUrl:
      'https://ichef.bbci.co.uk/ace/ws/976/cpsprodpb/189F/production/_121530360_hi071904982.jpg',
    mainBody:
      'Man City vs West Ham: Bad weather force Premier League to cancel Sunday match',
    minimumContrast: 8,
    paletteSize: 20,
  },
  argTypes: {
    imageUrl: { control: 'text' },
    mainBody: { control: 'text' },
    minimumContrast: { control: 'number' },
    paletteSize: { control: 'range', min: 2, max: 99, step: 1 },
  },
};

export const Standalone = Component;
export const CPSPromo = WithCPSPromoData;
export const CPSNewsPromo = WithNewsCPSPromoData;
export const LinkPromo = WithLinkPromoData;
