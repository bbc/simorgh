import React from 'react';
import { string } from 'prop-types';
import { Headline, SubHeading } from '@bbc/psammead-headings';
import { textDefaultPropTypes } from '../../models/propTypes';
import { ServiceContextConsumer } from '../../contexts/ServiceContext';
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

const regexPunctuationSymbols = /[^a-z0-9\s-]/gi;
const regexSpaces = /\s+/g;

const createId = (type, text) => {
  if (type === 'subheadline') {
    return text.replace(regexPunctuationSymbols, '').replace(regexSpaces, '-')
  }
  return undefined;
};

const HeadingsContainer = ({ blocks, type }) => {
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
      <ServiceContextConsumer>
        {({ script }) => (
          <Heading script={script} id={createId(type, text)}>
            {renderText()}
          </Heading>
        )}
      </ServiceContextConsumer>
    </GridConstrain>
  );
};

HeadingsContainer.propTypes = {
  ...headlineModelPropTypes,
  type: string.isRequired,
};

HeadingsContainer.defaultProps = textDefaultPropTypes;

export default HeadingsContainer;
