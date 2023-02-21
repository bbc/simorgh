import React from 'react';
import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { Headline, Link } from '#psammead/psammead-story-promo/src';
import LiveLabel from './index';
import notes from '../README.md';

const Wrapper = styled.div`
  position: relative;
`;

storiesOf('Components/LiveLabel', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(
    'with english live text',
    ({ service, dir }) => (
      <LiveLabel service={service} dir={dir} ariaHidden offScreenText="Live" />
    ),
    {
      notes,
    },
  )
  .add(
    'with localised live text',
    ({ service, dir }) => (
      <LiveLabel service={service} dir={dir} liveText="AS E DE HAPPEN" />
    ),
    {
      notes,
    },
  )
  .add(
    'with custom offscreen text',
    ({ service, dir }) => (
      <LiveLabel
        service={service}
        dir={dir}
        ariaHidden
        offScreenText="Watch Live"
      />
    ),
    {
      notes,
    },
  )
  .add(
    'with children',
    ({ text: headline, script, service, dir }) => (
      <Wrapper>
        <Headline script={script} service={service}>
          <Link href="https://www.bbc.co.uk/news">
            <LiveLabel
              service={service}
              dir={dir}
              ariaHidden
              offScreenText="Live"
            >
              {headline}
            </LiveLabel>
          </Link>
        </Headline>
      </Wrapper>
    ),
    {
      notes,
    },
  );
