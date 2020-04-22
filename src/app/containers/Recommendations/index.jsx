import React, { useEffect, useState } from 'react';
import 'isomorphic-fetch';

const RecommendationsContainer = assetUri => {
  const [recommendationsData, setRecommendations] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://camino-broker-cdn.api.bbci.co.uk/api/recommend?recSys=2&limit=4&assetUri=${assetUri}`,
      );
      const response = await result.json();
      return response;
    };
    fetchData().then(r => setRecommendations(r));
  }, [assetUri, recommendationsData]);
  return <div>{JSON.stringify(recommendationsData)}</div>;
};
export default RecommendationsContainer;
