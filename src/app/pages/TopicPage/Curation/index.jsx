import React from 'react';
import { arrayOf, oneOf, shape } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import CurationGrid from './CurationGrid';

export const VISUAL_STYLE = {
  NONE: 'NONE',
};

export const VISUAL_PROMINANCE = {
  NORMAL: 'NORMAL',
};

// Maps a visual style and prominance to a component that renders that curation
const components = {
  [VISUAL_STYLE.GRID]: {
    [VISUAL_PROMINANCE.STANDARD]: CurationGrid,
  },
};

const Curation = ({ visualStyle, visualProminance, promos }) => {
  const Component = pathOr(
    CurationGrid,
    [visualStyle, visualProminance],
    components,
  );
  return <Component promos={promos} />;
};

Curation.propTypes = {
  visualStyle: oneOf(Object.values(VISUAL_STYLE)).isRequired,
  visualProminance: oneOf(Object.values(VISUAL_PROMINANCE)).isRequired,
  promos: arrayOf(shape({})).isRequired,
};

export default Curation;
