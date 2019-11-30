import React, { useContext } from 'react';
import path from 'ramda/src/path';
import { Headline } from '@bbc/psammead-headings';
import { textDefaultPropTypes } from '#models/propTypes';
import { ServiceContext } from '#contexts/ServiceContext';
import { headlineModelPropTypes } from '#models/propTypes/headline';
import Fragment from '../Fragment';
import Blocks from '../Blocks';
import Grid, { ArticlePageGrid } from '#app/components/Grid';

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
    <ArticlePageGrid>
      <Grid
        item
        startOffset={{
          group0: 1,
          group1: 1,
          group2: 1,
          group3: 1,
          group4: 2,
          group5: 5,
        }}
        columns={{
          group0: 6,
          group1: 6,
          group2: 6,
          group3: 6,
          group4: 6,
          group5: 12,
        }}
        margins={{
          group0: true,
          group1: true,
          group2: true,
          group3: true,
        }}
      >
        <FauxHeadline script={script} service={service} aria-hidden="true">
          {renderText()}
        </FauxHeadline>
      </Grid>
    </ArticlePageGrid>
  );
};

FauxHeadlineContainer.propTypes = {
  ...headlineModelPropTypes,
};

FauxHeadlineContainer.defaultProps = textDefaultPropTypes;

export default FauxHeadlineContainer;
