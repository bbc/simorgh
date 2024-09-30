import React from 'react';
import { Helmet } from 'react-helmet';
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
import { StoryProps } from '#app/models/types/storybook';

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
    context: any,
  ) => {
    const globalService = context.globals?.service.service;
    const globalVariant = context.globals?.service.variant || DEFAULT_VARIANT;

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
    } = textOverrides;

    context.globals.service.service = textOverrides?.service || globalService;
    context.globals.service.variant = textOverrides?.variant || globalVariant;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const storyProps: any = {
      text,
      articlePath,
      longText,
      script: scripts[script as keyof typeof scripts],
      locale,
      dir,
      service: context.globals.service.service,
      variant: context.globals.service.variant,
      timezone,
      isLite: context.globals.isLite,
    };

    return (
      <>
        <Helmet htmlAttributes={{ dir }} />
        {story(storyProps)}
      </>
    );
  };
