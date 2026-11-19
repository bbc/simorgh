import RecommendationsCarousel, { RecommendationsCarouselProps } from '.';

type Props = Pick<RecommendationsCarouselProps, 'data'>;

const StackedRecommendationsCarousel = ({ data }: Props) => (
  <RecommendationsCarousel data={data} stacked />
);

export default StackedRecommendationsCarousel;
