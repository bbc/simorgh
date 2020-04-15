// To be able to test client-side renderering, we could for example create a Storybook story that allows us to change the include URL and re-render the include client-side in Storybook
import React, { useState, useEffect } from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import fetch from 'isomorphic-fetch';
import Include from '.';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import idt2Html from './fixture/idt2';
import vjHtml from './fixture/vj';

const defaultToggles = {
  include: {
    enabled: true,
  },
};

const label = 'Include';

const htmlOptions = {
  idt2: idt2Html,
  vj: vjHtml,
};

const options = {
  idt2: 'idt2',
  vj: 'vj',
};
const groupId = 'GROUP-ID1';

const multipleOptions = {
  vjOneTest:
    'https://www.test.bbc.com/ws/includes/include/newsspec/22766-democrats/mundo/app?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-test/app_launcher2_640-mundo_aldmj.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-test/app_launcher2_640-mundo_aldmj.png',
};

const defaultValue1 = 'idt2';

storiesOf('Containers|Include', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .add('default', () => {
    const option = select(label, options, defaultValue1, groupId);

    const html = htmlOptions[option];

    return (
      <ToggleContextProvider
        value={{ toggleState: defaultToggles }}
        service="mundo"
        origin="https://www.test.bbc.com"
      >
        <Include html={html} type="idt2" />
      </ToggleContextProvider>
    );
  })
  .add('multiple includes', () => {
    const href = select(label, multipleOptions, defaultValue1, groupId);

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
        <Include html={html} type="idt2" />
      </ToggleContextProvider>
    );
  });
