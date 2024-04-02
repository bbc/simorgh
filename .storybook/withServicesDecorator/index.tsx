import React from 'react';
import path from 'ramda/src/path';
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
const getVariant = (selectedService: Services) =>
  path([selectedService, 'variant']);
const getService = (selectedService: Services) =>
  path([selectedService, 'service']);

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

export default (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  story: (props: any) => JSX.Element,
  {
    globals: {
      service: { service: selectedService },
    },
  } = { globals: { service: { service: DEFAULT_SERVICE } } },
) => {
  const variant = getVariant(selectedService as Services)(TEXT_VARIANTS);

  const service = variant
    ? getService(selectedService as Services)(TEXT_VARIANTS)
    : selectedService;

  const {
    text,
    articlePath,
    longText,
    script,
    locale,
    dir = 'ltr',
    timezone = 'GMT',
  } = TEXT_VARIANTS[selectedService];

  const storyProps: any = {
    text,
    articlePath,
    longText,
    script: scripts[script as keyof typeof scripts],
    locale,
    dir,
    service,
    variant: variant || 'default',
    selectedService,
    timezone,
  };

  return (
    <>
      <Helmet htmlAttributes={{ dir }} />
      {story(storyProps)}
    </>
  );
};
