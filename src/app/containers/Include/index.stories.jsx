// To be able to test client-side renderering, we could for example create a Storybook story that allows us to change the include URL and re-render the include client-side in Storybook
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Include from '.';

storiesOf('Containers|Include', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <Include
        html="https://simorgh-include-test.s3-eu-west-1.amazonaws.com/idt2.html"
        type="idt2"
      />
    );
  });
