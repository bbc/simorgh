import React from 'react';
import { arrayOf, oneOf, shape, string, number } from 'prop-types';
import VisuallyHiddenText from '#psammead/psammead-visually-hidden-text/src';
import CurationGrid from './CurationGrid';
import HierarchicalGrid from './HierarchicalGrid';
import Subheading from './Subhead';
import { COMPONENT_NAMES, VISUAL_STYLE, VISUAL_PROMINENCE } from './constants';
import getComponent from '../../pages/TopicPage/getComponent';
import MessageBanner from '../MessageBanner';

const { SIMPLE_CURATION_GRID, HIERARCHICAL_CURATION_GRID, MESSAGE_BANNER } =
  COMPONENT_NAMES;

const getGridComponent = componentName => {
  switch (componentName) {
    case HIERARCHICAL_CURATION_GRID:
      return HierarchicalGrid;
    case SIMPLE_CURATION_GRID:
    default:
      return CurationGrid;
  }
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
  const GridComponent = getGridComponent(componentName);

  const createID = titleText => {
    return titleText.replaceAll(' ', '-');
  };

  const isFirstCuration = position === 0;
  const id = createID(title || topStoriesTitle);

  const SubheadingComponent = isFirstCuration ? VisuallyHiddenText : Subheading;

  switch (componentName) {
    case MESSAGE_BANNER:
      return (
        <MessageBanner
          heading={title}
          position={position}
          description={promos[0].description}
          link={promos[0].link}
          linkText={promos[0].title}
          image={promos[0].imageUrl}
        />
      );
    case SIMPLE_CURATION_GRID:
    case HIERARCHICAL_CURATION_GRID:
    default:
      return curationLength > 1 && (title || isFirstCuration) ? (
        <section aria-labelledby={id} role="region">
          <SubheadingComponent as="h2" a11yID={id} id={id} link={link}>
            {title || topStoriesTitle}
          </SubheadingComponent>
          <GridComponent
            promos={promos}
            headingLevel={isFirstCuration ? 3 : headingLevel}
          />
        </section>
      ) : (
        <GridComponent promos={promos} headingLevel={headingLevel} />
      );
  }
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
