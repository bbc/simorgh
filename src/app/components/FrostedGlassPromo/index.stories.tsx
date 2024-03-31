import React from 'react';

import { StoryProps } from '../../models/types/storybook';

import Promo from '.';
import {
  cpsPromoFixture,
  linkPromoFixture,
  cpsNewsPromoFixture,
} from './fixtures';

const STORY_ARGS = {
  imageUrl:
    'https://ichef.bbci.co.uk/ace/ws/976/cpsprodpb/189F/production/_121530360_hi071904982.jpg',
  mainBody:
    'Man City vs West Ham: Bad weather force Premier League to cancel Sunday match',
  minContrast: 8,
  paletteSize: 10,
};

const Component = {
  render: (_: StoryProps, { args }: any) => {
    const imageUrl = args?.imageUrl;
    const mainBody = args?.mainBody;
    const minimumContrast = args?.minContrast;
    const paletteSize = args?.paletteSize;

    return (
      <Promo
        // @ts-expect-error - passing in partial data
        image={{ src: imageUrl, alt: '', width: 500, height: 250, ratio: 52 }}
        url="#"
        minimumContrast={minimumContrast}
        paletteSize={paletteSize}
      >
        {mainBody}
      </Promo>
    );
  },
  args: STORY_ARGS,
};

const WithCPSPromoData = () => {
  return <Promo {...cpsPromoFixture} />;
};

const WithNewsCPSPromoData = () => {
  return <Promo {...cpsNewsPromoFixture} />;
};

const WithLinkPromoData = () => {
  return <Promo {...linkPromoFixture} />;
};

export default {
  title: 'New Components/Frosted Glass Promo',
  Component: Promo,
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
