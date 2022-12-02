import React from 'react';
import path from 'ramda/src/path';
import { Helmet } from 'react-helmet';
import { select } from '@storybook/addon-knobs';
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
const SERVICES_LIST = Object.keys(TEXT_VARIANTS);
const getVariant = selectedService => path([selectedService, 'variant']);
const getService = selectedService => path([selectedService, 'service']);
const includesService = services => service => services.includes(service);
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

export default ({
    defaultService = DEFAULT_SERVICE,
    services = SERVICES_LIST,
  } = {}) =>
  storyFn => {
    const selectedService = select(
      'Select a service',
      services.filter(includesService(services)),
      defaultService,
    );

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
      brandBackgroundColour,
      brandForegroundColour,
      brandBorderColour,
      brandHighlightColour,
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
      brandBackgroundColour,
      brandForegroundColour,
      brandBorderColour,
      brandHighlightColour,
    };

    return (
      <>
        <Helmet htmlAttributes={{ dir }} />
        {storyFn(storyProps)}
      </>
    );
  };
