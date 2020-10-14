import React from 'react';

// Utilities
import useToggle from '#hooks/useToggle';

const getMarkup = oembed => {
  return { __html: oembed.html };
};

const USElectionBanner = ({ oembed }) => {
  const { enabled } = useToggle('us2020ElectionBanner');

  if (!enabled || !oembed) return null;

  return (
    <>
      <div dangerouslySetInnerHTML={getMarkup(oembed)} />
    </>
  );
};

export default USElectionBanner;
