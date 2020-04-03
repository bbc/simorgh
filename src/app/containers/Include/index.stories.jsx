// To be able to test client-side renderering, we could for example create a Storybook story that allows us to change the include URL and re-render the include client-side in Storybook
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Include from '.';
import { ToggleContextProvider } from '#contexts/ToggleContext';

const defaultToggles = {
  include: {
    enabled: true,
  },
};

storiesOf('Containers|Include', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <ToggleContextProvider
        value={{ toggleState: defaultToggles }}
        service="mundo"
        origin="https://www.test.bbc.com"
      >
        <Include
          href="https://simorgh-include-test.s3-eu-west-1.amazonaws.com/idt2.html"
          type="idt2"
        />
      </ToggleContextProvider>
    );
  });
