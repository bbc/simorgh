import React from 'react';
import path from 'ramda/src/path';
import { Helmet } from 'react-helmet';
import { select } from '@storybook/addon-knobs';
import * as scripts from '@bbc/gel-foundations/scripts';
import TEXT_VARIANTS from './text-variants';

const DEFAULT_SERVICE = 'news';
const SERVICES_LIST = Object.keys(TEXT_VARIANTS);
const getVariant = selectedService => path([selectedService, 'variant']);
const getService = selectedService => path([selectedService, 'service']);
const includesService = services => service => services.includes(service);

export default ({
  defaultService = DEFAULT_SERVICE,
  services = SERVICES_LIST,
} = {}) => storyFn => {
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
