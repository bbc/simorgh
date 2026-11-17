import ReadTimeTabs from '.';
import useFetchReadTimeRecommendations from './useFetchReadTimeRecommendations';

type ReadTimeRecommendationsProps = {
  topicId: string;
  className?: string;
};

const ReadTimeRecommendations = ({
  topicId,
  className,
}: ReadTimeRecommendationsProps) => {
  const { items, isLoading, isError } = useFetchReadTimeRecommendations({
    topicId,
  });

  return (
    <ReadTimeTabs
      items={items}
      isLoading={isLoading}
      isError={isError}
      className={className}
    />
  );
};

export default ReadTimeRecommendations;
