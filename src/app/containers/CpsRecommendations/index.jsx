import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';
import 'isomorphic-fetch';
import webLogger from '#lib/logger.web';

const logger = webLogger();

const CpsRecommendationsContainer = ({ path }) => {
  const [recommendationsData, setRecommendations] = useState({ items: [] });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://camino-broker-cdn.api.bbci.co.uk${path}`,
        );
        const data = await response.json();
        setRecommendations(data);
      } catch (error) {
        logger.error(`HTTP Error: "${error}"`);
      }
    };
    fetchData();
  }, [path]);
  const { items } = recommendationsData;
  return (
    !!items.length && (
      <ul>
        {recommendationsData.items.map(item => (
          <li key={item.shortHeadline}>{item.shortHeadline}</li>
        ))}
      </ul>
    )
  );
};

CpsRecommendationsContainer.propTypes = {
  path: string.isRequired,
};

export default CpsRecommendationsContainer;
