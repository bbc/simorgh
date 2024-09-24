import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { text, select, boolean, withKnobs } from '@storybook/addon-knobs';
import * as typography from '#psammead/gel-foundations/src/typography';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import latin from '../../../components/ThemeProvider/fontScripts/latin';
import notes from '../README.md';
import Timestamp from '.';

const styles = Object.keys(typography)
  .map(key => {
    if (
      typeof typography[key] === 'function' &&
      key.substring(0, 3) === 'get'
    ) {
      return key.substring(3);
    }
    return null;
  })
  .filter(style => style);

const ExampleTimestamp = ({ children, ...props }) => {
  const padding = boolean('Padding', true);
  const style = select('Typography', styles, 'Brevier');
  const typographyFunc = typography[`get${style}`];

  return (
    <Timestamp
      datetime="1530947227000"
      typographyFunc={typographyFunc}
      script={latin}
      padding={padding}
      {...props}
    >
      {children}
    </Timestamp>
  );
};

storiesOf('Components/Timestamp', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(
    'default',
    ({ service }) => (
      <ExampleTimestamp service={service}>
        {text('Timestamp Text', '7 July 2018')}
      </ExampleTimestamp>
    ),
    { notes },
  )
  .add(
    'with "updated" prefix',
    ({ service }) => (
      <ExampleTimestamp service={service}>
        {text('Timestamp Text', 'Updated 7 July 2018')}
      </ExampleTimestamp>
    ),
    { notes },
  );
