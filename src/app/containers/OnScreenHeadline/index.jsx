import React, { useContext } from 'react';
import { Headline } from '@bbc/psammead-headings';
import { textDefaultPropTypes } from '#models/propTypes';
import { ServiceContext } from '#contexts/ServiceContext';
import { headlineModelPropTypes } from '#models/propTypes/headline';
import Fragment from '../Fragment';
import Blocks from '../Blocks';
import { GridItemConstrainedLarge } from '#lib/styledGrid';

// missing CSS 'display: block;' in psammead branch `explicitly-set-h1-styles-display-and-font-weight`
const OnScreenHeadline = props => <Headline as="strong" {...props} />;

const OnScreenHeadlineContainer = ({ blocks }) => {
  const { script, service } = useContext(ServiceContext);

  const arrayOfFragments = blocks[0].model.blocks[0].model.blocks;

  if (!arrayOfFragments || !Array.isArray(arrayOfFragments)) {
    return null;
  }
  const componentsToRender = { fragment: Fragment };

  const renderText = () => (
    <Blocks blocks={arrayOfFragments} componentsToRender={componentsToRender} />
  );

  return (
    <GridItemConstrainedLarge>
      <OnScreenHeadline script={script} service={service} aria-hidden="true">
        {renderText()}
      </OnScreenHeadline>
    </GridItemConstrainedLarge>
  );
};

OnScreenHeadlineContainer.propTypes = {
  ...headlineModelPropTypes,
};

OnScreenHeadlineContainer.defaultProps = textDefaultPropTypes;

export default OnScreenHeadlineContainer;
