import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { UsefulLink, UsefulLinksLi, UsefulLinksUl } from './index';
import notes from '../README.md';

const usefulCaptions = [
  {
    name: 'Mitocinmu da sauko da sautin labarai',
    url: 'https://www.bbc.com/igbo/afirika-49883577',
  },
  {
    name: 'Labaran BBC Hausa a text',
    url: 'https://www.bbc.com/igbo/afirika-49872694',
  },
  {
    name: 'Abokan huldar BBC Hausa',
    url: 'https://www.bbc.com/igbo/afirika-49869003',
  },
  {
    name: 'Timi Frank: Osinbajo ya maka mutum biyu',
    url: 'https://www.bbc.com/igbo/afirika-49883189',
  },
  {
    name: 'Gwaninta ba ta karbi wani dan Nijeriya',
    url: 'https://www.bbc.com/igbo/afirika-49869001',
  },
];

storiesOf('Components/UsefulLinks', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(
    'one link',
    ({ service, script }) => (
      <UsefulLink
        script={script}
        service={service}
        href={usefulCaptions[0].url}
      >
        {usefulCaptions[0].name}
      </UsefulLink>
    ),
    {
      notes,
      knobs: { escapeHTML: false },
    },
  )
  .add(
    'multiple links',
    ({ service, script }) => (
      <UsefulLinksUl>
        {usefulCaptions.map(item => {
          return (
            <UsefulLinksLi key={usefulCaptions.indexOf(item)}>
              <UsefulLink service={service} script={script} href={item.url}>
                {item.name}
              </UsefulLink>
            </UsefulLinksLi>
          );
        })}
      </UsefulLinksUl>
    ),
    {
      notes,
      knobs: { escapeHTML: false },
    },
  );
