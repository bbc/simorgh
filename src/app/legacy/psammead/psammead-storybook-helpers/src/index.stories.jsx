import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import notes from '../README.md';
import { withServicesKnob } from '.';

storiesOf('Utilities/withServicesKnob', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    () =>
      withServicesKnob()(({ text, dir, script, service }) => (
        <>
          <p>I toggle dir based on language.</p>
          <p>I also provide components with these props:</p>
          <ul>
            <li>text: {text}</li>
            <li>service: {service}</li>
            <li>dir: {dir}</li>
            <li>
              script: <pre>{JSON.stringify(script, null, ' ')}</pre>
            </li>
          </ul>
        </>
      )),
    { notes },
  )
  .add(
    'withServicesKnob with defaultService option',
    () =>
      withServicesKnob({ defaultService: 'arabic' })(
        ({ text, dir, script, service }) => (
          <>
            <p>I toggle dir based on language.</p>
            <p>The default service is `arabic`.</p>
            <p>I also provide components with these props:</p>
            <ul>
              <li>text: {text}</li>
              <li>service: {service}</li>
              <li>dir: {dir}</li>
              <li>
                script: <pre>{JSON.stringify(script, null, ' ')}</pre>
              </li>
            </ul>
          </>
        ),
      ),
    { notes },
  )
  .add(
    'withServicesKnob with services option',
    () =>
      withServicesKnob({ services: ['news', 'arabic', 'amharic'] })(
        ({ text, dir, script, service }) => (
          <>
            <p>I toggle dir based on language.</p>
            <p>
              The list of services you can select include only `news`, `arabic`,
              `amharic`.
            </p>
            <p>I also provide components with these props:</p>
            <ul>
              <li>text: {text}</li>
              <li>service: {service}</li>
              <li>dir: {dir}</li>
              <li>
                script: <pre>{JSON.stringify(script, null, ' ')}</pre>
              </li>
            </ul>
          </>
        ),
      ),
    { notes },
  );
