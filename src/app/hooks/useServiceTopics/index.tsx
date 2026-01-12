import { useEffect, useState } from 'react';
import { Services } from '#app/models/types/global';

import { TopicTag } from '#app/models/types/metadata';

type ServiceTopics = {
  headline: string;
  topics: TopicTag[];
};

const useServiceTopics = (service: Services) => {
  const [topicsData, setTopicsData] = useState<ServiceTopics | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    import(`../../fixtures/topics/${service}.json`)
      .then(module => {
        const data = module.default || module;
        if (typeof data.headline === 'string' && Array.isArray(data.topics)) {
          setTopicsData(data);
        } else {
          setError('Invalid topics data structure.');
        }
      })
      .catch(() => setError('No topics data available for this service.'));
  }, [service]);

  return { topicsData, error };
};

export default useServiceTopics;
