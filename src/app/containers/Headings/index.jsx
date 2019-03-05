import React from 'react';
import { string } from 'prop-types';
import { Headline, SubHeading } from '@bbc/psammead-headings';
import { extractText } from '../../helpers/blockHandlers';
import { textDefaultPropTypes } from '../../models/propTypes';
import { headlineModelPropTypes } from '../../models/propTypes/headline';
import {
  GridItemConstrainedMedium,
  GridItemConstrainedLarge,
} from '../../lib/styledGrid';

const Headings = {
  headline: Headline,
  subheadline: SubHeading,
};

const GridConstrains = {
  headline: GridItemConstrainedLarge,
  subheadline: GridItemConstrainedMedium,
};

const HeadingsContainer = ({ blocks, type }) => {
  const Heading = Headings[type];
  const GridConstrain = GridConstrains[type];

  const { text } = extractText(blocks);

  if (!text) {
    return null;
  }

  return (
    <GridConstrain>
      <Heading text={text}>{text}</Heading>
    </GridConstrain>
  );
};

HeadingsContainer.propTypes = {
  ...headlineModelPropTypes,
  type: string.isRequired,
};

HeadingsContainer.defaultProps = textDefaultPropTypes;

export default HeadingsContainer;
