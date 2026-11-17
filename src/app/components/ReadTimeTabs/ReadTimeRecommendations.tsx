import ReadTimeTabs from '.';
import useFetchReadTimeRecommendations from './useFetchReadTimeRecommendations';

type ReadTimeRecommendationsProps = {
  topicIds: string[];
  className?: string;
};

const ReadTimeRecommendations = ({
  topicIds,
  className,
}: ReadTimeRecommendationsProps) => {
  const { items, isLoading, isError } = useFetchReadTimeRecommendations({
    topicIds,
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
