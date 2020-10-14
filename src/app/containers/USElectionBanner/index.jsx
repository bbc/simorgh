import React from 'react';

// Utilities
import useToggle from '#hooks/useToggle';

// Fixture Data
import Fixture from './fixture.json';

const getMarkup = () => {
  return { __html: Fixture.html };
};

const USElectionBanner = () => {
  const { enabled } = useToggle('us2020ElectionBanner');

  if (!enabled) return null;

  return (
    <>
      <div dangerouslySetInnerHTML={getMarkup()} />
    </>
  );
};

export default USElectionBanner;
