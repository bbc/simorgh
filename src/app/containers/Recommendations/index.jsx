import React, { useEffect, useState } from 'react';
import 'isomorphic-fetch';

// eslint-disable-next-line react/prop-types
const RecommendationsContainer = ({ assetUri }) => {
  const [recommendationsData, setRecommendations] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://camino-broker-cdn.api.bbci.co.uk/api/recommend?recSys=2&limit=4&assetUri=${assetUri}`,
      ).catch(function (error) {
        // handle error
        console.log(error);
      });
      const response = await result.text();
      return JSON.parse(response);
    };
    fetchData().then(r => {
      setRecommendations(r);
    });
  }, [assetUri, recommendationsData]);
  return <div>{JSON.stringify(recommendationsData)}</div>;
};
export default RecommendationsContainer;
