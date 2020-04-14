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
  idt2:
    'https://www.test.bbc.com/ws/includes/idt2/cb1a5166-cfbb-4520-bdac-6159299acff6/html',
  vj:
    'https://www.test.bbc.com/ws/includes/include/vjamericas/169-brazil-pensions-reform/portuguese/app?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-werty/venta-app-pensoes_ui943.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-werty/venta-app-pensoes_ui943.png',
};
const defaultValue =
  'https://www.test.bbc.com/ws/includes/idt2/cb1a5166-cfbb-4520-bdac-6159299acff6/html';
const groupId = 'GROUP-ID1';

const multipleOptions = {
  vjOneTest:
    'https://www.test.bbc.com/ws/includes/include/newsspec/22766-democrats/mundo/app?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-test/app_launcher2_640-mundo_aldmj.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-test/app_launcher2_640-mundo_aldmj.png',
};

const defaultValue1 =
  'https://www.test.bbc.com/ws/includes/include/vjeastasia/185-timeline-generator/nepali/china_4th_june_nepali?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/include/vjeastasia/185-timeline-generator/assets/china_4th_june_burmese-project-assets/img/100.jpg&app-clickable=true&amp-clickable=true&amp-image-height=689&amp-image-width=1024&amp-image=https://news.files.bbci.co.uk/include/vjeastasia/185-timeline-generator/assets/china_4th_june_burmese-project-assets/img/100.jpg';

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
