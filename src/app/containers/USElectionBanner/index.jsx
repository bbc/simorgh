import React from 'react';
import Fixture from './fixture.json';

const getMarkup = () => {
  return { __html: Fixture.html };
};

const USElectionBanner = () => (
  <>
    <div dangerouslySetInnerHTML={getMarkup()} />
  </>
);

export default USElectionBanner;
