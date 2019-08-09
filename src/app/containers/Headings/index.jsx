import React, { useContext } from 'react';
import { string } from 'prop-types';
import { textDefaultPropTypes } from '../../models/propTypes';
import { ServiceContext } from '../../contexts/ServiceContext';
import { headlineModelPropTypes } from '../../models/propTypes/headline';
import Fragment from '../Fragment';
import Blocks from '../Blocks';
import idSanitiser from '../../lib/utilities/idSanitiser';
import {
  GridItemConstrainedMedium,
  GridItemConstrainedLarge,
} from '../../lib/styledGrid';

const Headings = {
  headline: <h1 />,
  subheadline: <h2 />,
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

  const subHeadingId = sanitiseSubheadline(type, text);

  return (
    <GridConstrain>
      <h2>heya</h2>
    </GridConstrain>
  );
};

HeadingsContainer.propTypes = {
  ...headlineModelPropTypes,
  type: string.isRequired,
};

HeadingsContainer.defaultProps = textDefaultPropTypes;

export default HeadingsContainer;
