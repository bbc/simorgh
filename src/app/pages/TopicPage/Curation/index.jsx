import React from 'react';
import { arrayOf, oneOf, shape, string, number } from 'prop-types';
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
  topStoriesTitle,
  link,
  headingLevel,
  position,
  curationLength,
}) => {
  if (!promos.length) return null;
  const Component = pathOr(
    CurationGrid,
    [visualStyle, visualProminance],
    components,
  );

  const createID = titleText => {
    return titleText.replaceAll(' ', '-');
  };
  return curationLength > 1 && (title || position === 0) ? (
    <section aria-labelledby={createID(title || topStoriesTitle)} role="region">
      <Subheading a11yID={createID(title || topStoriesTitle)} href={link}>
        {title}
      </Subheading>
      <Component promos={promos} headingLevel={headingLevel} />
    </section>
  ) : (
    <Component promos={promos} headingLevel={headingLevel} />
  );
};

Curation.propTypes = {
  visualStyle: oneOf(Object.values(VISUAL_STYLE)).isRequired,
  visualProminance: oneOf(Object.values(VISUAL_PROMINANCE)).isRequired,
  promos: arrayOf(shape({})).isRequired,
  title: string,
  link: string,
  headingLevel: number,
  position: number.isRequired,
  topStoriesTitle: string,
  curationLength: number.isRequired,
};

Curation.defaultProps = {
  title: '',
  link: '',
  headingLevel: 2,
  topStoriesTitle: '',
};

export default Curation;
