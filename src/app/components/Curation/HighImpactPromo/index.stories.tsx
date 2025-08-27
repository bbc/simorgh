import React from 'react';
import fixture from '#data/pidgin/topics/c95y35941vrt.json';
import HighImpactPromo from '.';
import { BaseCuration, Summary } from '#app/models/types/curationData';

const highImpactFixtureCuration = fixture.data.curations[1] as BaseCuration;

const Component = () => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        flexDirection: 'column',
        maxWidth: '480px',
      }}
    >
      <HighImpactPromo
        {...(highImpactFixtureCuration.summaries?.[0] as Summary)}
        subject={{
          href: '/pidgin',
          text: 'BBC News Pidgin',
        }}
      />
      <HighImpactPromo
        {...(highImpactFixtureCuration.summaries?.[1] as Summary)}
        subject={{
          href: '/mundo',
          text: 'BBC News Mundo',
        }}
      />
      <HighImpactPromo
        {...(highImpactFixtureCuration.summaries?.[2] as Summary)}
        subject={{
          href: '/',
          text: 'BBC',
        }}
      />
    </div>
  );
};

export default {
  title: 'Components/Curation/High Impact Promo',
  component: Component,
  parameters: {
    chromatic: { disable: true },
  },
};

export const Example = {};
