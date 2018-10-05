import React from 'react';
import { string } from 'prop-types';
import { extractText } from '../../helpers/blockHandlers';
import { textDefaultPropTypes } from '../../models/propTypes';
import { headlineModelPropTypes } from '../../models/propTypes/headline';
import { Headline, SubHeading } from '../../components/Headings';

const Headings = {
  headline: Headline,
  subheadline: SubHeading,
};

const HeadingsContainer = ({ blocks, type }) => {
  const Heading = Headings[type];

  const { text } = extractText(blocks);

  if (!text) {
    return null;
  }

  return <Heading text={text}>{text}</Heading>;
};

HeadingsContainer.propTypes = {
  ...headlineModelPropTypes,
  type: string.isRequired,
};

HeadingsContainer.defaultProps = textDefaultPropTypes;

export default HeadingsContainer;
