import articleData from '#data/mundo/articles/cddylv9g8z0o.json';
import RecommendationsCarousel from '.';
import { recommendationsFixtures } from '../Recommendations/fixtures';
import metadata from './metadata.json';
import readme from './README.md';

const mundoRecommendations = articleData.data.article.content.model.blocks.flatMap(
  block =>
    block.type === 'wsoj' && 'data' in block.model
      ? (block.model.data ?? [])
      : [],
);

export default {
  title: 'Components/RecommendationsCarousel',
  component: RecommendationsCarousel,
  parameters: {
    docs: { readme },
    metadata,
    chromatic: { viewports: [320, 600, 1008] },
  },
  globals: {
    service: { service: 'mundo', variant: 'default' },
  },
};

export const Default = {
  name: 'Non-modal Mundo Carousel',
  render: () => (
    <RecommendationsCarousel
      data={mundoRecommendations}
      title={'M\u00e1s le\u00eddas'}
      eventTrackingData={{ componentName: 'midarticle-mostread' }}
    />
  ),
};

export const MultipleItems = () => (
  <RecommendationsCarousel
    data={recommendationsFixtures}
    title={'M\u00e1s le\u00eddas'}
    eventTrackingData={{ componentName: 'midarticle-mostread' }}
  />
);

export const SingleItem = () => (
  <RecommendationsCarousel
    data={recommendationsFixtures.slice(0, 1)}
    title={'M\u00e1s le\u00eddas'}
    eventTrackingData={{ componentName: 'midarticle-mostread' }}
  />
);
