import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import {
  withServicesKnob,
  buildRTLSubstories,
} from '@bbc/psammead-storybook-helpers';
import notes from '../README.md';
import SectionLabel from './index';

const STORY_KIND = 'Components/SectionLabel';
const selectFirst2Words = text =>
  text
    .split(' ')
    .filter((word, i) => i < 2)
    .join(' ');

storiesOf(STORY_KIND, module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(
    'default',
    ({ text, script, dir, service }) => (
      <SectionLabel
        script={script}
        dir={dir}
        bar={boolean('show bar?', true)}
        mobileDivider={boolean('show divider on mobile?', true)}
        visuallyHidden={boolean(
          'visually hide component for all breakpoints?',
          false,
        )}
        labelId="example-section-label"
        service={service}
      >
        {service === 'news' ? 'Most Read' : text}
      </SectionLabel>
    ),
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'with heading overriden to be a strong element',
    ({ text, script, dir, service }) => (
      <SectionLabel
        script={script}
        dir={dir}
        bar={boolean('show bar?', true)}
        mobileDivider={boolean('show divider on mobile?', true)}
        visuallyHidden={boolean(
          'visually hide component for all breakpoints?',
          false,
        )}
        labelId="example-section-label"
        service={service}
        overrideHeadingAs="strong"
      >
        {service === 'news' ? 'Most Read' : text}
      </SectionLabel>
    ),
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'with a link',
    ({ text, script, dir, service }) => (
      <SectionLabel
        script={script}
        dir={dir}
        bar={boolean('show bar?', true)}
        mobileDivider={boolean('show divider on mobile?', true)}
        visuallyHidden={boolean(
          'visually hide component for all breakpoints?',
          false,
        )}
        labelId="example-section-label"
        service={service}
        linkText={service === 'news' ? 'See All' : selectFirst2Words(text)}
        href="https://www.bbc.com/igbo"
      >
        {service === 'news' ? 'Most Read' : text}
      </SectionLabel>
    ),
    { notes, knobs: { escapeHTML: false } },
  );

buildRTLSubstories(STORY_KIND, {
  include: ['default', 'with a link'],
});
