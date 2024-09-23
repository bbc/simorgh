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
import { Services } from '../../src/app/models/types/global';

const DEFAULT_SERVICE = 'news';
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

export default (overrideProps?: { defaultService?: Services }) =>
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    story: (storyProps: any) => JSX.Element,
    {
      globals: {
        service: { service, variant },
        isLite,
      },
    } = {
      globals: {
        service: { service: DEFAULT_SERVICE, variant: DEFAULT_VARIANT },
        isLite: false,
      },
    },
  ) => {
    const defaultServiceOverride = overrideProps?.defaultService;
    const serviceToUse = defaultServiceOverride || service;

    let serviceLookup = serviceToUse;

    if (variant !== DEFAULT_VARIANT) {
      serviceLookup = `${service}-${variant}`;
    }

    const {
      text,
      articlePath,
      longText,
      script,
      locale,
      dir = 'ltr',
      timezone = 'GMT',
    } = TEXT_VARIANTS[serviceLookup];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const storyProps: any = {
      text,
      articlePath,
      longText,
      script: scripts[script as keyof typeof scripts],
      locale,
      dir,
      service,
      variant: variant || DEFAULT_VARIANT,
      selectedService: serviceToUse,
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
