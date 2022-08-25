import React from 'react';
import path from 'ramda/src/path';
import { Helmet } from 'react-helmet';
import { select } from '@storybook/addon-knobs';
import TEXT_VARIANTS from './text-variants';
import arabic from '../../../../components/ThemeProvider/typography/scripts/arabic';
import bengali from '../../../../components/ThemeProvider/typography/scripts/bengali';
import burmese from '../../../../components/ThemeProvider/typography/scripts/burmese';
import devanagariAndGurmukhi from '../../../../components/ThemeProvider/typography/scripts/devanagari';
import latin from '../../../../components/ThemeProvider/typography/scripts/latin';
import cyrillic from '../../../../components/ThemeProvider/typography/scripts/cyrillic';
import latinDiacritics from '../../../../components/ThemeProvider/typography/scripts/latinWithDiacritics';
import noAscendersOrDescenders from '../../../../components/ThemeProvider/typography/scripts/noAscOrDesc';
import sinhalese from '../../../../components/ThemeProvider/typography/scripts/sinhalese';
import tamil from '../../../../components/ThemeProvider/typography/scripts/tamil';
import thai from '../../../../components/ThemeProvider/typography/scripts/thai';

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
      variant: variant || null,
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
