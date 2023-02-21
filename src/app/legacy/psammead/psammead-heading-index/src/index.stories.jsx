import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import notes from '../README.md';
import HeadingIndex from './index';

storiesOf('Components/Index Heading', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(
    'default',
    ({ text: textSnippet, script, service }) => (
      <HeadingIndex script={script} service={service}>
        {textSnippet}
      </HeadingIndex>
    ),
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'with optional ID',
    ({ text: textSnippet, script, service }) => {
      const id = text('ID', 'content', 'Other');
      return (
        <HeadingIndex id={id} script={script} service={service}>
          {textSnippet}
        </HeadingIndex>
      );
    },
    { notes, knobs: { escapeHTML: false } },
  );
