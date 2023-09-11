import React from 'react';
import pathOr from 'ramda/src/pathOr';
import { string } from 'prop-types';
import { textDefaultPropTypes } from '#models/propTypes';
import { headlineModelPropTypes } from '#models/propTypes/headline';
import idSanitiser from '#lib/utilities/idSanitiser';
import { GridItemMedium, GridItemLarge } from '#components/Grid';
import HeadingComponent from '#app/components/Heading';
import styles from './index.styles';
import Fragment from '../Fragment';
import InlineContainer from '../InlineContainer';
import Blocks from '../Blocks';

const Headings = {
  headline: HeadingComponent,
  subheadline: HeadingComponent,
};

const GridItems = {
  headline: GridItemLarge,
  subheadline: GridItemMedium,
};

const sanitiseSubheadline = (type, text) => {
  if (text && type === 'subheadline') {
    return idSanitiser(text);
  }
  return null;
};

const HeadingsContainer = ({ blocks, type }) => {
  // update the below to not be weird
  const Heading = Headings[type];
  const GridItem = GridItems[type];

  const arrayOfFragments = blocks[0].model.blocks[0].model.blocks;
  const isFirstBlock = pathOr(1, ['position', 0])(blocks[0]) === 1;

  if (!arrayOfFragments || !Array.isArray(arrayOfFragments)) {
    return null;
  }
  const { text } = blocks[0].model.blocks[0].model;
  const componentsToRender = { fragment: Fragment, inline: InlineContainer };

  const renderText = () => (
    <Blocks blocks={arrayOfFragments} componentsToRender={componentsToRender} />
  );

  const headingId = isFirstBlock ? 'content' : null; // Used for the skiplink
  const subHeadingId = sanitiseSubheadline(type, text);
  const isHeading = type === 'headline';
  const isFirstHeading = isHeading && isFirstBlock;

  const headingProps = {
    headline: {
      id: headingId,
      ...(!isFirstHeading && { as: 'strong' }),
      tabIndex: isHeading && !isFirstBlock ? null : '-1',
      // to change to level: headingLevel || 1,
      level: 1,
      fontVariant: 'serifMedium',
      css: styles.headline,
    },
    subheadline: {
      id: subHeadingId,
      // to change to level: headingLevel || 2,
      level: 2,
      fontVariant: 'sansBold',
      tabIndex: isHeading && !isFirstBlock ? null : '-1',
      css: styles.subHeading,
    },
  };

  return (
    <GridItem>
      <Heading {...headingProps[type]}>{renderText()}</Heading>
    </GridItem>
  );
};

HeadingsContainer.propTypes = {
  ...headlineModelPropTypes,
  type: string.isRequired,
  // headingLevel: string,
};

HeadingsContainer.defaultProps = textDefaultPropTypes;

export default HeadingsContainer;
