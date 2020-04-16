// To be able to test client-side renderering, we could for example create a Storybook story that allows us to change the include URL and re-render the include client-side in Storybook
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Include from '.';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import idt2Html from './fixture/idt2';
import vjHtml from './fixture/vj';

const defaultToggles = {
  include: {
    enabled: true,
  },
};

const htmlOptions = {
  idt2: idt2Html,
  vj: vjHtml,
};

storiesOf('Containers|Include', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .add('idt2', () => {
    return (
      <ToggleContextProvider
        value={{ toggleState: defaultToggles }}
        service="mundo"
        origin="https://www.test.bbc.com"
      >
        <Include html={htmlOptions.idt2} type="idt2" />
      </ToggleContextProvider>
    );
  })
  .add('vj', () => {
    return (
      <ToggleContextProvider
        value={{ toggleState: defaultToggles }}
        service="mundo"
        origin="https://www.test.bbc.com"
      >
        <Include html={htmlOptions.vj} type="vj" />
      </ToggleContextProvider>
    );
  })
  .add('multiple includes', () => {
    return (
      <ToggleContextProvider
        value={{ toggleState: defaultToggles }}
        service="mundo"
        origin="https://www.test.bbc.com"
      >
        <Include html={htmlOptions.idt2} type="idt2" />
        <Include html={htmlOptions.vj} type="vj" />
      </ToggleContextProvider>
    );
  });
