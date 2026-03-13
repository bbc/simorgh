import fixture from '#data/ws/homePage/index.json';
import HighImpactPromo from '.';
import { BaseCuration, Summary } from '#app/models/types/curationData';
import metadata from './metadata.json';
import readme from './README.md';

const highImpactFixtureCuration = fixture.data.curations[0] as BaseCuration;

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
        attributions={[
          {
            title: 'BBC News Pidgin',
            link: { url: '/pidgin' },
          },
        ]}
      />
      <HighImpactPromo
        {...(highImpactFixtureCuration.summaries?.[1] as Summary)}
        attributions={[
          {
            title: 'BBC News Mundo',
            link: { url: '/mundo' },
          },
        ]}
      />
      <HighImpactPromo
        {...(highImpactFixtureCuration.summaries?.[2] as Summary)}
        attributions={[
          {
            title: 'BBC',
            link: { url: '/' },
          },
        ]}
      />
    </div>
  );
};

export default {
  title: 'Components/Curation/High Impact Promo',
  component: Component,
  parameters: {
    metadata,
    docs: { readme },
    chromatic: { disable: true },
  },
};

export const Example = {};
