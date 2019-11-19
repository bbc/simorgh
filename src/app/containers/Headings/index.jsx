import React, { useContext } from 'react';
import { string } from 'prop-types';
import { Headline, SubHeading } from '@bbc/psammead-headings';
import { textDefaultPropTypes } from '#models/propTypes';
import { ServiceContext } from '#contexts/ServiceContext';
import { headlineModelPropTypes } from '#models/propTypes/headline';
import Fragment from '../Fragment';
import Blocks from '../Blocks';
import idSanitiser from '#lib/utilities/idSanitiser';
import Grid, { ArticlePageGrid } from '#app/components/Grid';

const Headings = {
  headline: Headline,
  subheadline: SubHeading,
};

const layouts = {
  headline: {
    group0: 6,
    group1: 6,
    group2: 6,
    group3: 6,
    group4: 6,
    group5: 12,
  },
  subheadline: {
    group0: 6,
    group1: 6,
    group2: 6,
    group3: 5,
    group4: 5,
    group5: 10,
  },
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
    <ArticlePageGrid>
      <Grid
        enableGelMargins
        item
        startOffset={{
          group0: 1,
          group1: 1,
          group2: 1,
          group3: 1,
          group4: 2,
          group5: 5,
        }}
        columns={layouts[type]}
        margins={{
          group0: true,
          group1: true,
          group2: true,
          group3: true,
        }}
      >
        <Heading script={script} service={service} id={id} tabIndex="-1">
          {renderText()}
        </Heading>
      </Grid>
    </ArticlePageGrid>
  );
};

HeadingsContainer.propTypes = {
  ...headlineModelPropTypes,
  type: string.isRequired,
};

HeadingsContainer.defaultProps = textDefaultPropTypes;

export default HeadingsContainer;
