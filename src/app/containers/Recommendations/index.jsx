import React, { useEffect, useState } from 'react';

const RecommendationsContainer = assetUri => {
  const [recommendationsData, setRecommendations] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://camino-broker-cdn.api.bbci.co.uk/api/recommend?recSys=2&limit=4&assetUri=${assetUri}`,
      );
      setRecommendations(result);
    };
    fetchData();
  }, [assetUri]);
  return <div>{recommendationsData}</div>;
};
export default RecommendationsContainer;
