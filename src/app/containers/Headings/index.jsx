import React, { useContext } from 'react';
import { string } from 'prop-types';
import { Headline, SubHeading } from '@bbc/psammead-headings';
import { textDefaultPropTypes } from '../../models/propTypes';
import { ServiceContext } from '../../contexts/ServiceContext';
import { headlineModelPropTypes } from '../../models/propTypes/headline';
import Fragment from '../Fragment';
import Blocks from '../Blocks';
import {
  GridItemConstrainedMedium,
  GridItemConstrainedLarge,
} from '../../lib/styledGrid';

const Headings = {
  headline: Headline,
  subheadline: SubHeading,
};

const GridConstraints = {
  headline: GridItemConstrainedLarge,
  subheadline: GridItemConstrainedMedium,
};

const HeadingsContainer = ({ blocks, type }) => {
  const { script } = useContext(ServiceContext);
  const Heading = Headings[type];
  const GridConstrain = GridConstraints[type];

  const arrayOfFragments = blocks[0].model.blocks[0].model.blocks;

  if (!arrayOfFragments || !Array.isArray(arrayOfFragments)) {
    return null;
  }
  const { text } = blocks[0].model.blocks[0].model;
  const componentsToRender = { fragment: Fragment };

  const renderText = () => (
    <Blocks blocks={arrayOfFragments} componentsToRender={componentsToRender} />
  );

  return (
    <GridConstrain>
      <Heading script={script} text={text}>
        {renderText()}
      </Heading>
    </GridConstrain>
  );
};

HeadingsContainer.propTypes = {
  ...headlineModelPropTypes,
  type: string.isRequired,
};

HeadingsContainer.defaultProps = textDefaultPropTypes;

export default HeadingsContainer;
