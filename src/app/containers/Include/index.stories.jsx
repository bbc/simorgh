// To be able to test client-side renderering, we could for example create a Storybook story that allows us to change the include URL and re-render the include client-side in Storybook
import React, { useState, useEffect } from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import fetch from 'isomorphic-fetch';
import Include from '.';
import { ToggleContextProvider } from '#contexts/ToggleContext';

const defaultToggles = {
  include: {
    enabled: true,
  },
};

const label = 'Include';
const options = {
  idt2: 'https://simorgh-include-test.s3-eu-west-1.amazonaws.com/idt2.html',
  vj: 'https://simorgh-include-test.s3-eu-west-1.amazonaws.com/vj.html',
};
const defaultValue =
  'https://simorgh-include-test.s3-eu-west-1.amazonaws.com/idt2.html';
const groupId = 'GROUP-ID1';

storiesOf('Containers|Include', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .add('default', () => {
    const href = select(label, options, defaultValue, groupId);

    const [html, setHtml] = useState('');

    useEffect(() => {
      const fetchInclude = async () => {
        const response = await fetch(href);
        setHtml(await response.text());
      };
      fetchInclude();
    }, [href]);

    return (
      <ToggleContextProvider
        value={{ toggleState: defaultToggles }}
        service="mundo"
        origin="https://www.test.bbc.com"
      >
        <Include html={html} type="idt2" />
      </ToggleContextProvider>
    );
  });
