import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import InlineLink from '#psammead/psammead-inline-link/src';
import VisuallyHiddenText from '#components/VisuallyHiddenText';
import {
  withServicesKnob,
  buildRTLSubstories,
} from '#psammead/psammead-storybook-helpers/src';
import notes from '../README.md';
import Caption from '.';

const STORY_KIND = 'Components/Caption';

storiesOf('Components/Caption', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(
    'default',
    ({ text, script, service, dir }) => (
      <Caption script={script} service={service} dir={dir}>
        {text}
      </Caption>
    ),
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'with offscreen text',
    ({ text, script, service, dir }) => (
      <Caption script={script} service={service} dir={dir}>
        <VisuallyHiddenText>
          {service === 'news' ? 'visually hidden text' : text}
        </VisuallyHiddenText>
        {service === 'news' ? 'caption' : text}
      </Caption>
    ),
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'containing an inline link',
    ({ text, script, service, dir }) => (
      <Caption script={script} service={service} dir={dir}>
        {`${service === 'news' ? 'caption' : text} `}
        <InlineLink href="https://www.bbc.com">
          {service === 'news' ? 'inline link' : text}
        </InlineLink>
        {` ${service === 'news' ? 'caption' : text} `}
      </Caption>
    ),
    { notes, knobs: { escapeHTML: false } },
  );

storiesOf('Components/Caption', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(
    'containing italicisation',
    ({ script, service, dir }) => (
      <Caption script={script} service={service} dir={dir}>
        Example text with <i>italics</i>
      </Caption>
    ),
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'containing multiple paragraphs',
    ({ script, service, dir }) => (
      <Caption script={script} service={service} dir={dir}>
        <p>Paragraph with padding bottom.</p>
        <p>
          Last paragraph - <i>without padding bottom</i>.
        </p>
      </Caption>
    ),
    { notes, knobs: { escapeHTML: false } },
  );

buildRTLSubstories(STORY_KIND, {
  include: [
    'default',
    'with offscreen text',
    'containing an inline link',
    'containing italicisation',
    'containing multiple paragraphs',
  ],
});
