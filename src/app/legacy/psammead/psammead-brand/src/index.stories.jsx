import React from 'react';
import {
  color,
  select,
  number,
  text,
  withKnobs,
  boolean,
} from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as svgs from '#psammead/psammead-assets/src/svgs';
import { POSTBOX, WHITE } from '../../../../components/ThemeProvider/palette';
import {
  withServicesKnob,
  buildRTLSubstories,
} from '#psammead/psammead-storybook-helpers/src';
import ScriptLink from '../../../../components/Header/ScriptLink';
import Brand from './index';
import SkipLink from './SkipLink';
import notes from '../README.md';

const STORY_KIND = 'Components/Brand';
const inputs = (service = 'news') => {
  const options = Object.keys(svgs).filter(key => key !== 'BBC_BLOCKS');
  const svgChoice = select('Service SVG', options, service).toLowerCase();
  const productInput = text('Product', 'BBC News');
  const serviceLocalisedNameInput = text('Localised service name', 'Yoruba');
  const svgRatio = svgs[svgChoice].ratio;
  const svgMaxHeight = 24;
  const svgMinHeight = 16;
  const minWidthInput = number('minimum svg width', svgRatio * svgMinHeight);
  const maxWidthInput = number('maximum svg width', svgRatio * svgMaxHeight);
  const svgHeightInput = number('desired height svg', svgMaxHeight);
  const borderBottom = boolean('Border Bottom', false);
  const borderTop = boolean('Border Top', false);
  const backgroundColour = color('Background colour', `${POSTBOX}`);
  const logoColour = color('Logo colour', `${WHITE}`);

  return {
    productInput,
    serviceLocalisedNameInput,
    svgChoice,
    svgHeightInput,
    minWidthInput,
    maxWidthInput,
    borderTop,
    borderBottom,
    backgroundColour,
    logoColour,
  };
};

storiesOf(STORY_KIND, module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(
    'without brand link',
    ({ service }) => {
      const {
        productInput,
        serviceLocalisedNameInput,
        svgHeightInput,
        minWidthInput,
        maxWidthInput,
        svgChoice,
        borderBottom,
        borderTop,
        backgroundColour,
        logoColour,
      } = inputs(service);

      return (
        <Brand
          product={productInput}
          serviceLocalisedName={serviceLocalisedNameInput}
          svgHeight={svgHeightInput}
          minWidth={minWidthInput}
          maxWidth={maxWidthInput}
          svg={svgs[svgChoice]}
          borderBottom={borderBottom}
          borderTop={borderTop}
          backgroundColour={backgroundColour}
          logoColour={logoColour}
        />
      );
    },
    { notes },
  )
  .add(
    'with brand link',
    ({ service }) => {
      const {
        productInput,
        serviceLocalisedNameInput,
        svgHeightInput,
        minWidthInput,
        maxWidthInput,
        svgChoice,
        borderBottom,
        borderTop,
        backgroundColour,
        logoColour,
      } = inputs(service);

      return (
        <Brand
          product={productInput}
          serviceLocalisedName={serviceLocalisedNameInput}
          svgHeight={svgHeightInput}
          minWidth={minWidthInput}
          maxWidth={maxWidthInput}
          svg={svgs[svgChoice]}
          url="https://www.bbc.com/news"
          borderBottom={borderBottom}
          borderTop={borderTop}
          backgroundColour={backgroundColour}
          logoColour={logoColour}
        />
      );
    },
    { notes },
  )
  .add(
    'with script link',
    ({ service, script }) => {
      const scriptLink = (
        <ScriptLink
          script={script}
          service={service}
          href="https://www.bbc.com/serbian/lat"
        >
          Lat
        </ScriptLink>
      );

      const {
        productInput,
        serviceLocalisedNameInput,
        svgHeightInput,
        minWidthInput,
        maxWidthInput,
        svgChoice,
        borderBottom,
        borderTop,
        backgroundColour,
        logoColour,
      } = inputs();

      return (
        <Brand
          product={productInput}
          serviceLocalisedName={serviceLocalisedNameInput}
          svgHeight={svgHeightInput}
          minWidth={minWidthInput}
          maxWidth={maxWidthInput}
          svg={svgs[svgChoice]}
          url="https://www.bbc.com/news"
          borderBottom={borderBottom}
          borderTop={borderTop}
          backgroundColour={backgroundColour}
          logoColour={logoColour}
          scriptLink={scriptLink}
        />
      );
    },
    { notes },
  )
  .add(
    'with skip to content link and script link',
    ({ service, script, dir }) => {
      const scriptLink = (
        <ScriptLink
          script={script}
          service={service}
          href="https://www.bbc.com/serbian/lat"
        >
          Lat
        </ScriptLink>
      );

      const {
        productInput,
        serviceLocalisedNameInput,
        svgHeightInput,
        minWidthInput,
        maxWidthInput,
        svgChoice,
        borderBottom,
        borderTop,
        backgroundColour,
        logoColour,
      } = inputs();

      const skipLink = (
        <SkipLink service={service} script={script} href="#content" dir={dir}>
          Skip to content
        </SkipLink>
      );

      return (
        <Brand
          product={productInput}
          serviceLocalisedName={serviceLocalisedNameInput}
          svgHeight={svgHeightInput}
          minWidth={minWidthInput}
          maxWidth={maxWidthInput}
          svg={svgs[svgChoice]}
          url="https://www.bbc.com/news"
          borderBottom={borderBottom}
          borderTop={borderTop}
          backgroundColour={backgroundColour}
          logoColour={logoColour}
          skipLink={skipLink}
          scriptLink={scriptLink}
        />
      );
    },
    { notes },
  )
  .add(
    'with linkId',
    ({ service }) => {
      const {
        productInput,
        serviceLocalisedNameInput,
        svgHeightInput,
        minWidthInput,
        maxWidthInput,
        svgChoice,
        borderBottom,
        borderTop,
        backgroundColour,
        logoColour,
      } = inputs(service);

      return (
        <Brand
          product={productInput}
          serviceLocalisedName={serviceLocalisedNameInput}
          svgHeight={svgHeightInput}
          minWidth={minWidthInput}
          maxWidth={maxWidthInput}
          svg={svgs[svgChoice]}
          url="https://www.bbc.com/news"
          borderBottom={borderBottom}
          borderTop={borderTop}
          backgroundColour={backgroundColour}
          logoColour={logoColour}
          linkId="brandLink"
        />
      );
    },
    { notes },
  );

buildRTLSubstories(STORY_KIND, { include: ['with brand link'] });
