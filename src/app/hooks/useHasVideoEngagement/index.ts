import { useEffect, useState } from 'react';
import { hasVideoEngagement } from '#app/lib/utilities/videoEngagement';

// Read after mount so server and first client render match (always false).
const useHasVideoEngagement = () => {
  const [hasEngaged, setHasEngaged] = useState(false);

  useEffect(() => {
    setHasEngaged(hasVideoEngagement());
  }, []);

  return hasEngaged;
};

export default useHasVideoEngagement;
