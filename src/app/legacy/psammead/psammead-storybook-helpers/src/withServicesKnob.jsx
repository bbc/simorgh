import React from 'react';
import path from 'ramda/src/path';
import { Helmet } from 'react-helmet';
import TEXT_VARIANTS from './text-variants';
import arabic from '../../../../components/ThemeProvider/fontScripts/arabic';
import bengali from '../../../../components/ThemeProvider/fontScripts/bengali';
import burmese from '../../../../components/ThemeProvider/fontScripts/burmese';
import devanagariAndGurmukhi from '../../../../components/ThemeProvider/fontScripts/devanagari';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import cyrillic from '../../../../components/ThemeProvider/fontScripts/cyrillic';
import latinDiacritics from '../../../../components/ThemeProvider/fontScripts/latinWithDiacritics';
import noAscendersOrDescenders from '../../../../components/ThemeProvider/fontScripts/noAscOrDesc';
import sinhalese from '../../../../components/ThemeProvider/fontScripts/sinhalese';
import tamil from '../../../../components/ThemeProvider/fontScripts/tamil';
import thai from '../../../../components/ThemeProvider/fontScripts/thai';

const DEFAULT_SERVICE = 'news';
const getVariant = selectedService => path([selectedService, 'variant']);
const getService = selectedService => path([selectedService, 'service']);

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
  story,
  {
    globals: {
      service: { service: selectedService },
    },
  } = { globals: { service: { service: DEFAULT_SERVICE } } },
) => {
  const variant = getVariant(selectedService)(TEXT_VARIANTS);

  const service = variant
    ? getService(selectedService)(TEXT_VARIANTS)
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

  const storyProps = {
    text,
    articlePath,
    longText,
    script: scripts[script],
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
