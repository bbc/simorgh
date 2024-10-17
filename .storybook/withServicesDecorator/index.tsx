import React from 'react';
import { Helmet } from 'react-helmet';
import { StoryProps } from '#app/models/types/storybook';
import { Services, Variants } from '#app/models/types/global';
import TEXT_VARIANTS from './text-variants';
import arabic from '../../src/app/components/ThemeProvider/fontScripts/arabic';
import bengali from '../../src/app/components/ThemeProvider/fontScripts/bengali';
import burmese from '../../src/app/components/ThemeProvider/fontScripts/burmese';
import devanagariAndGurmukhi from '../../src/app/components/ThemeProvider/fontScripts/devanagari';
import latin from '../../src/app/components/ThemeProvider/fontScripts/latin';
import cyrillic from '../../src/app/components/ThemeProvider/fontScripts/cyrillic';
import latinDiacritics from '../../src/app/components/ThemeProvider/fontScripts/latinWithDiacritics';
import noAscendersOrDescenders from '../../src/app/components/ThemeProvider/fontScripts/noAscOrDesc';
import sinhalese from '../../src/app/components/ThemeProvider/fontScripts/sinhalese';
import tamil from '../../src/app/components/ThemeProvider/fontScripts/tamil';
import thai from '../../src/app/components/ThemeProvider/fontScripts/thai';

const DEFAULT_VARIANT = 'default';

const scripts = {
  arabic,
  bengali,
  burmese,
  devanagariAndGurmukhi,
  hindi: devanagariAndGurmukhi,
  nepali: devanagariAndGurmukhi,
  cyrillic,
  cyrillicAndLatin: cyrillic,
  latin,
  latinDiacritics,
  chinese: noAscendersOrDescenders,
  ethiopic: noAscendersOrDescenders,
  korean: noAscendersOrDescenders,
  noAscendersOrDescenders,
  sinhalese,
  tamil,
  thai,
};

export default () =>
  (
    story: (storyProps: StoryProps) => JSX.Element,
    {
      globals: {
        service: { service: globalService, variant: globalVariant },
        isLite,
      },
    }: {
      globals: {
        service: {
          service: Services;
          variant: Variants;
        };
        isLite: boolean;
      };
    },
  ) => {
    let serviceLookup: string = globalService;

    if (globalVariant !== DEFAULT_VARIANT) {
      serviceLookup = `${globalService}-${globalVariant}`;
    }

    const textOverrides = TEXT_VARIANTS[serviceLookup];

    const {
      text,
      articlePath,
      longText,
      script,
      locale,
      dir = 'ltr',
      timezone = 'GMT',
    } = textOverrides || {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const storyProps: any = {
      text,
      articlePath,
      longText,
      script: scripts[script as keyof typeof scripts],
      locale,
      dir,
      service: textOverrides?.service || globalService,
      variant: textOverrides?.variant || globalVariant,
      timezone,
      isLite,
    };

    return (
      <>
        <Helmet htmlAttributes={{ dir }} />
        {story(storyProps)}
      </>
    );
  };
