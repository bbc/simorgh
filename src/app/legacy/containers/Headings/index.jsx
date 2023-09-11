import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import { string } from 'prop-types';
import styled from '@emotion/styled';
// import { Headline, SubHeading } from '#psammead/psammead-headings/src';
import { textDefaultPropTypes } from '#models/propTypes';
import { headlineModelPropTypes } from '#models/propTypes/headline';
import idSanitiser from '#lib/utilities/idSanitiser';
import { GridItemMedium, GridItemLarge } from '#components/Grid';
import HeadingComponent from '#app/components/Heading';
// import {
//   GEL_SPACING_TRPL,
//   GEL_SPACING_QUAD,
//   GEL_SPACING_QUIN,
// } from '#psammead/gel-foundations/src/spacings';
// import {
//   getCanon,
//   getTrafalgar,
// } from '#psammead/gel-foundations/src/typography';
// import { MEDIA_QUERY_TYPOGRAPHY } from '#psammead/gel-foundations/src/breakpoints';
// import {
//   getSansBold,
//   getSerifMedium,
// } from '#psammead/psammead-styles/src/font-styles';
// import { ServiceContext } from '../../../contexts/ServiceContext';
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

const HeadingsContainer = ({ blocks, type, headingLevel }) => {
  // const { script, service } = useContext(ServiceContext);
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

  const headingProps = {
    headline: {
      id: headingId,
      // check this works
      as: isHeading && !isFirstBlock ? 'strong' : null,
      tabIndex: isHeading && !isFirstBlock ? null : '-1',
      level: headingLevel || 1,
      fontVariant: 'serifMedium',
      css: styles.headline,
    },
    subheading: {
      id: subHeadingId,
      level: headingLevel || 2,
      fontVariant: 'sansBold',
      css: styles.subHeading,
    },
  };

  // const headingProps = {
  //   id: isHeading ? headingId : subHeadingId,
  //   as: isHeading && !isFirstBlock ? 'strong' : null,
  //   tabIndex: isHeading && !isFirstBlock ? null : '-1',
  //   // as: level || 'h1',
  // };

  return (
    <GridItem>
      {/* <NewHeading script={script} service={service} {...headingProps}>
        {renderText()}
      </NewHeading> */}
      <Heading {...headingProps[type]}>{renderText()}</Heading>
    </GridItem>
  );
};

HeadingsContainer.propTypes = {
  ...headlineModelPropTypes,
  type: string.isRequired,
  headingLevel: string,
};

HeadingsContainer.defaultProps = textDefaultPropTypes;

export default HeadingsContainer;
