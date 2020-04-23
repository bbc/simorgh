import React, { useEffect, useState } from 'react';
import 'isomorphic-fetch';

// eslint-disable-next-line react/prop-types
const RecommendationsContainer = ({ assetUri }) => {
  const [recommendationsData, setRecommendations] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://camino-broker-cdn.api.bbci.co.uk/api/recommend?recSys=2&limit=4&assetUri=${assetUri}`,
        );
        const data = await response.json();
        setRecommendations(data);
      } catch (error) {
        // handle error
        console.log(error);
      }
    };
    fetchData();
  }, [assetUri]);
  return (
    recommendationsData && (
      <>
      {recommendationsData.items.map((item) => (
        <span key={item.shortHeadline}>{item.shortHeadline}</span>

      ))}
      </>
    )
  );
};
export default RecommendationsContainer;
