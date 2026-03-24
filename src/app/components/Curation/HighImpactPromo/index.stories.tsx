import fixture from '#data/ws/homePage/index.json';
import HighImpactPromo from '.';
import { BaseCuration, Summary } from '#app/models/types/curationData';
import metadata from './metadata.json';
import readme from './README.md';

const highImpactFixtureCuration = fixture.data.curations[0] as BaseCuration;
const baseProps = highImpactFixtureCuration.summaries?.[0] as Summary;

interface ExternalProps {
  attributions?: { title: string; link: { url: string } }[] | null;
  relatedTopic?: { title: string; link: { url: string } } | null;
}

const Component = ({ attributions, relatedTopic }: ExternalProps) => (
  <HighImpactPromo
    {...baseProps}
    attributions={attributions}
    relatedTopic={relatedTopic}
  />
);

export default {
  title: 'Components/Curation/High Impact Promo',
  Component,
  decorators: [
    Story => (
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          flexDirection: 'column',
          maxWidth: '480px',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    metadata,
    docs: { readme },
    chromatic: { disable: true },
  },
  args: {
    attributions: [
      {
        title: 'BBC News Pidgin',
        link: { url: '/pidgin' },
      },
    ],
    relatedTopic: {
      title: 'Related Topic Example',
      link: { url: '/topic/example' },
    },
  },
  argTypes: {
    attributions: { control: 'object' },
    relatedTopic: { control: 'object' },
  },
};

export const Example = Component;
