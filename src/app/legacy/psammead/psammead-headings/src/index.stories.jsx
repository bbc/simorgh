import React from 'react';
import { storiesOf } from '@storybook/react-webpack5';
import { text, withKnobs } from '@storybook/addon-knobs';
import {
  withServicesKnob,
  themes,
} from '#psammead/psammead-storybook-helpers/src';
import notes from '../README.md';
import { Headline, SubHeading } from './index';

storiesOf('Components/Headline', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(
    'default',
    ({ text: textSnippet }) => <Headline>{textSnippet}</Headline>,
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'dark mode',
    ({ text: textSnippet }) => <Headline>{textSnippet}</Headline>,
    { notes, knobs: { escapeHTML: false }, options: { theme: themes.dark } },
  );

storiesOf('Components/SubHeading', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(
    'default',
    ({ text: textSnippet }) => <SubHeading>{textSnippet}</SubHeading>,
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'with optional ID',
    ({ text: textSnippet }) => {
      const id = text('ID', 'foo', 'Other');
      return <SubHeading id={id}>{textSnippet}</SubHeading>;
    },
    { notes, knobs: { escapeHTML: false } },
  );
