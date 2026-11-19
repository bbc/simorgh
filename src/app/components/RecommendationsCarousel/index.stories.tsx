import { RequestContextProvider } from '#app/contexts/RequestContext';
import RecommendationsCarousel from '.';
import StackedRecommendationsCarousel from './StackedRecommendationsCarousel';
import recommendationsCarouselFixture from './fixtures';
import readme from './README.md';
import metadata from './metadata.json';

export default {
  title: 'Components/RecommendationsCarousel',
  component: RecommendationsCarousel,
  parameters: { docs: { readme }, metadata },
  globals: { service: { service: 'mundo', variant: 'default' } },
  decorators: [
    Story => (
      <RequestContextProvider
        bbcOrigin="http://localhost:9001"
        pageType="article"
        service="mundo"
        pathname="/mundo/articles/c1xv2q1gewvo"
      >
        <Story />
      </RequestContextProvider>
    ),
  ],
};

export const Default = () => (
  <RecommendationsCarousel data={recommendationsCarouselFixture} />
);

export const StackedSquares = () => (
  <StackedRecommendationsCarousel data={recommendationsCarouselFixture} />
);
