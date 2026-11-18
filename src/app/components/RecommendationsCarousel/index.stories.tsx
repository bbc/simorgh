import articleData from '#data/mundo/articles/c1xv2q1gewvo.json';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import RecommendationsCarousel from '.';
import readme from './README.md';
import metadata from './metadata.json';

const recommendationsBlock = articleData.data.article.content.model.blocks.find(
  block => block.type === 'wsoj',
);

export default {
  title: 'Components/RecommendationsCarousel',
  component: RecommendationsCarousel,
  parameters: { docs: { readme }, metadata },
  globals: { service: { service: 'mundo', variant: 'default' } },
};

export const Default = () => (
  <RequestContextProvider
    bbcOrigin="http://localhost:9001"
    pageType="article"
    service="mundo"
    pathname="/mundo/articles/c1xv2q1gewvo"
  >
    <RecommendationsCarousel
      data={
        recommendationsBlock && 'data' in recommendationsBlock.model
          ? (recommendationsBlock.model.data ?? [])
          : []
      }
    />
  </RequestContextProvider>
);
