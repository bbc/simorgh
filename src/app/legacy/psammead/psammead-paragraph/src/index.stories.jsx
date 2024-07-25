import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import InlineLink from '#psammead/psammead-inline-link/src';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
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
