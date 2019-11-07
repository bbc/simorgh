import React, { useContext } from 'react';
import path from 'ramda/src/path';
import { Headline } from '@bbc/psammead-headings';
import { textDefaultPropTypes } from '#models/propTypes';
import { ServiceContext } from '#contexts/ServiceContext';
import { headlineModelPropTypes } from '#models/propTypes/headline';
import Fragment from '../Fragment';
import Blocks from '../Blocks';
import { GridItemConstrainedLarge } from '#lib/styledGrid';

// missing CSS 'display: block;' in psammead branch `explicitly-set-h1-styles-display-and-font-weight`
const FauxHeadline = props => <Headline as="strong" {...props} />;

const FauxHeadlineContainer = ({ blocks }) => {
  const { script, service } = useContext(ServiceContext);

  const arrayOfFragments = path(
    ['0', 'model', 'blocks', '0', 'model', 'blocks'],
    blocks,
  );

  if (!arrayOfFragments || !Array.isArray(arrayOfFragments)) {
    return null;
  }
  const componentsToRender = { fragment: Fragment };

  const renderText = () => (
    <Blocks blocks={arrayOfFragments} componentsToRender={componentsToRender} />
  );

  return (
    <GridItemConstrainedLarge>
      <FauxHeadline script={script} service={service} aria-hidden="true">
        {renderText()}
      </FauxHeadline>
    </GridItemConstrainedLarge>
  );
};

FauxHeadlineContainer.propTypes = {
  ...headlineModelPropTypes,
};

FauxHeadlineContainer.defaultProps = textDefaultPropTypes;

export default FauxHeadlineContainer;
