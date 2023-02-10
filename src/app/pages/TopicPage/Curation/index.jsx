import React from 'react';
import { arrayOf, oneOf, shape, string, number } from 'prop-types';
import VisuallyHiddenText from '#psammead/psammead-visually-hidden-text/src';
import CurationGrid from './CurationGrid';
import HierarchicalGrid from '../HierarchicalGrid';
import Subheading from './Subhead';
import { COMPONENT_NAMES, VISUAL_STYLE, VISUAL_PROMINENCE } from '../constants';
import getComponent from '../getComponent';

// eslint-disable-next-line no-unused-vars
const { SIMPLE_CURATION_GRID, HIERARCHICAL_CURATION_GRID } = COMPONENT_NAMES;

// Maps a visual style and prominence to a component that renders that curation
const components = {
  SIMPLE_CURATION_GRID: CurationGrid,
  HIERARCHICAL_CURATION_GRID: HierarchicalGrid,
};

const Curation = ({
  visualStyle,
  visualProminence,
  promos,
  title,
  topStoriesTitle,
  link,
  headingLevel,
  position,
  curationLength,
}) => {
  if (!promos.length) return null;

  const componentName = getComponent(visualStyle, visualProminence);

  // Look up component map for an entry which matches componentName. If not foind, default to CurationGrid
  const Component = components[componentName] || CurationGrid;

  const createID = titleText => {
    return titleText.replaceAll(' ', '-');
  };

  const isFirstCuration = position === 0;
  const SubheadingComponent = isFirstCuration ? VisuallyHiddenText : Subheading;
  const id = createID(title || topStoriesTitle);

  return curationLength > 1 && (title || isFirstCuration) ? (
    <section aria-labelledby={id} role="region">
      <SubheadingComponent as="h2" a11yID={id} id={id} link={link}>
        {title || topStoriesTitle}
      </SubheadingComponent>
      <Component
        promos={promos}
        headingLevel={isFirstCuration ? 3 : headingLevel}
      />
    </section>
  ) : (
    <Component promos={promos} headingLevel={headingLevel} />
  );
};

Curation.propTypes = {
  visualStyle: oneOf(Object.values(VISUAL_STYLE)).isRequired,
  visualProminence: oneOf(Object.values(VISUAL_PROMINENCE)).isRequired,
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
