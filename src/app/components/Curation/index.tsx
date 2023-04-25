/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  CurationProps,
  VISUAL_STYLE,
  VISUAL_PROMINENCE,
} from '#app/models/types/curationData';
import MostReadContainer from '#app/legacy/containers/MostRead';
import VisuallyHiddenText from '../VisuallyHiddenText';
import CurationGrid from './CurationGrid';
import HierarchicalGrid from './HierarchicalGrid';
import Subheading from './Subhead';
import getComponentName, { COMPONENT_NAMES } from './getComponentName';
import MessageBanner from '../MessageBanner';

const {
  SIMPLE_CURATION_GRID,
  HIERARCHICAL_CURATION_GRID,
  MOST_READ,
  MESSAGE_BANNER,
  NOT_SUPPORTED,
} = COMPONENT_NAMES;

const { NONE } = VISUAL_STYLE;
const { NORMAL } = VISUAL_PROMINENCE;

const getGridComponent = (componentName: string | null) => {
  switch (componentName) {
    case HIERARCHICAL_CURATION_GRID:
      return HierarchicalGrid;
    case SIMPLE_CURATION_GRID:
    default:
      return CurationGrid;
  }
};

const createID = (titleText: string) => {
  return titleText.replaceAll(' ', '-');
};

const Curation = ({
  visualStyle = NONE,
  visualProminence = NORMAL,
  promos = [],
  title = '',
  topStoriesTitle = '',
  link = '',
  headingLevel = 2,
  position = 0,
  curationLength = 0,
  mostRead,
}: CurationProps) => {
  const componentName = getComponentName(visualStyle, visualProminence);
  const GridComponent = getGridComponent(componentName);

  const isFirstCuration = position === 0;
  const id = createID(title || topStoriesTitle);

  const SubheadingComponent = isFirstCuration ? VisuallyHiddenText : Subheading;

  switch (componentName) {
    case NOT_SUPPORTED:
      return null;
    case MESSAGE_BANNER:
      return (
        <MessageBanner
          heading={title}
          description={promos[0].description}
          link={promos[0].link}
          linkText={promos[0].title}
          image={promos[0].imageUrl}
        />
      );
    case MOST_READ:
      // @ts-expect-error spike ticket
      return <MostReadContainer initialData={mostRead} />;
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

export default Curation;
