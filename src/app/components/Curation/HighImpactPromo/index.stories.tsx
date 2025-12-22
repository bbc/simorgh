import fixture from '#data/ws/homePage/index.json';
import HighImpactPromo from '.';
import { BaseCuration, Summary } from '#app/models/types/curationData';
import metadata from './metadata.json';
import readme from './README.md';

const highImpactFixtureCuration = fixture.data.curations[0] as BaseCuration;

const topicTags = [
  {
    topicId: 'c404v061z85t',
    topicName: 'Africa',
    subjectList: [],
    curationList: [],
    types: [],
    home: '',
    topicUrl: '',
  },
  {
    topicId: 'c2dwqd1zr92t',
    topicName: 'Nigeria',
    subjectList: [],
    curationList: [],
    types: [],
    home: '',
    topicUrl: '',
  },
];

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
      {/* Default attribution (service-based) */}
      <HighImpactPromo
        {...(highImpactFixtureCuration.summaries?.[0] as Summary)}
        attribution={{
          link: '/pidgin',
          text: 'BBC News Pidgin',
        }}
      />
      {/* Attribution with primaryTopic (topic-based) */}
      <HighImpactPromo
        {...(highImpactFixtureCuration.summaries?.[1] as Summary)}
        primaryTopic={topicTags[0]}
      />
      {/* Attribution with custom attribution prop */}
      <HighImpactPromo
        {...(highImpactFixtureCuration.summaries?.[1] as Summary)}
        attribution={{
          link: '/mundo',
          text: 'BBC News Mundo',
        }}
      />
      <HighImpactPromo
        {...(highImpactFixtureCuration.summaries?.[2] as Summary)}
        attribution={{
          link: '/',
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
    metadata,
    docs: { readme },
    chromatic: { disable: true },
  },
};

export const Example = {};
