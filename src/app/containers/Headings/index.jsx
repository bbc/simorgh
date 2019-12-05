import React, { useContext } from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { Headline, SubHeading } from '@bbc/psammead-headings';
import { textDefaultPropTypes } from '#models/propTypes';
import { ServiceContext } from '#contexts/ServiceContext';
import { headlineModelPropTypes } from '#models/propTypes/headline';
import Fragment from '../Fragment';
import Blocks from '../Blocks';
import idSanitiser from '#lib/utilities/idSanitiser';
import {
  GridItemConstrainedMedium,
  GridItemConstrainedLarge,
} from '#lib/styledGrid';

const StyledHeadline = styled(Headline)`
  :focus {
    outline: none;
  }
`;

const Headings = {
  headline: StyledHeadline,
  subheadline: SubHeading,
};

const GridConstraints = {
  headline: GridItemConstrainedLarge,
  subheadline: GridItemConstrainedMedium,
};

const sanitiseSubheadline = (type, text) => {
  if (text && type === 'subheadline') {
    return idSanitiser(text);
  }
  return null;
};

const HeadingsContainer = ({ blocks, type }) => {
  const { script, service } = useContext(ServiceContext);
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

  const headingId = 'content'; // Used for the skiplink
  const subHeadingId = sanitiseSubheadline(type, text);
  const id = type === 'headline' ? headingId : subHeadingId;

  return (
    <GridConstrain>
      <Heading script={script} service={service} id={id} tabIndex="-1">
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
