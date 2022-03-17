/* eslint-disable react/prop-types */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import InlineLink from '@bbc/psammead-inline-link';
import { withServicesKnob, themes } from '@bbc/psammead-storybook-helpers';
import notes from '../README.md';
import Paragraph from './index';

storiesOf('Components/Paragraph', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(
    'default',
    ({ text, script, service }) => (
      <Paragraph script={script} service={service}>
        {text}
      </Paragraph>
    ),
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'dark mode',
    ({ text, script, service }) => (
      <Paragraph script={script} service={service} darkMode>
        {text}
      </Paragraph>
    ),
    { notes, knobs: { escapeHTML: false }, options: { theme: themes.dark } },
  )
  .add(
    'containing an inline link',
    ({ text, script, service }) => (
      <Paragraph script={script} service={service}>
        {`${text} `}
        <InlineLink href="https://www.bbc.com">{text}</InlineLink>
        {` ${text}`}
      </Paragraph>
    ),

    { notes, knobs: { escapeHTML: false } },
  );
