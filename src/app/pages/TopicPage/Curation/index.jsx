import React from 'react';
import { arrayOf, oneOf, shape, string } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import CurationGrid from './CurationGrid';
import Subheading from './Subhead';

export const VISUAL_STYLE = {
  NONE: 'NONE',
};

export const VISUAL_PROMINANCE = {
  NORMAL: 'NORMAL',
};

// Maps a visual style and prominance to a component that renders that curation
const components = {
  [VISUAL_STYLE.NONE]: {
    [VISUAL_PROMINANCE.NORMAL]: CurationGrid,
  },
};

const Curation = ({
  visualStyle,
  visualProminance,
  promos,
  title,
  link,
  headingStyle,
  position,
}) => {
  const Component = pathOr(
    CurationGrid,
    [visualStyle, visualProminance],
    components,
  );
  return title || position === 0 ? (
    <section aria-labelledby={title || 'Top Stories'} role="region">
      <Subheading href={link}>{title}</Subheading>
      <Component promos={promos} headingStyle={headingStyle} />
    </section>
  ) : (
    <Component promos={promos} headingStyle={headingStyle} />
  );
};

Curation.propTypes = {
  visualStyle: oneOf(Object.values(VISUAL_STYLE)).isRequired,
  visualProminance: oneOf(Object.values(VISUAL_PROMINANCE)).isRequired,
  promos: arrayOf(shape({})).isRequired,
  title: string,
  link: string,
  headingStyle: string,
};

Curation.defaultProps = {
  title: '',
  link: '',
  headingStyle: 'h2',
};

export default Curation;
