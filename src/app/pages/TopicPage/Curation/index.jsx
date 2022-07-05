import React from 'react';
import { arrayOf, oneOf, shape } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import CurationGrid from './CurationGrid';

export const VISUAL_PROMINANCE = {
  STANDARD: 'STANDARD',
};

export const CURATION_TYPE = {
  GRID: 'GRID',
};

// Maps a curation type and prominance to a component that renders that curation
const components = {
  [CURATION_TYPE.GRID]: {
    [VISUAL_PROMINANCE.STANDARD]: CurationGrid,
  },
};

const Curation = ({ type, prominance, promos }) => {
  const Component = pathOr(CurationGrid, [type, prominance], components);
  return <Component promos={promos} />;
};

Curation.propTypes = {
  type: oneOf(Object.values(CURATION_TYPE)).isRequired,
  prominance: oneOf(Object.values(VISUAL_PROMINANCE)).isRequired,
  promos: arrayOf(shape({})).isRequired,
};

export default Curation;
