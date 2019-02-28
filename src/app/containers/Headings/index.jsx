import React from 'react';
import { string } from 'prop-types';
import { Headline, SubHeading } from '@bbc/psammead-headings';
import { textDefaultPropTypes } from '../../models/propTypes';
import { headlineModelPropTypes } from '../../models/propTypes/headline';
import Fragment from '../Fragment';
import Blocks from '../Blocks';

const Headings = {
  headline: Headline,
  subheadline: SubHeading,
};

const HeadingsContainer = ({ blocks, type }) => {
  const Heading = Headings[type];

  const arrayOfFragments = blocks[0].model.blocks[0].model.blocks;

  if (!arrayOfFragments || !Array.isArray(arrayOfFragments)) {
    return null;
  }
  const { text } = blocks[0].model.blocks[0].model;
  const componentsToRender = { fragment: Fragment };

  const renderText = () => (
    <Blocks blocks={arrayOfFragments} componentsToRender={componentsToRender} />
  );

  return <Heading text={text}>{renderText()}</Heading>;
};

HeadingsContainer.propTypes = {
  ...headlineModelPropTypes,
  type: string.isRequired,
};

HeadingsContainer.defaultProps = textDefaultPropTypes;

export default HeadingsContainer;
