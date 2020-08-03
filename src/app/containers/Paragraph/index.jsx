import React, { useContext } from 'react';
import Paragraph from '@bbc/psammead-paragraph';
import Grid from '@bbc/psammead-grid';
import { ServiceContext } from '#contexts/ServiceContext';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import InlineLink from '../InlineLink';
import Inline from '../InlineContainer';
import { paragraphModelPropTypes } from '#models/propTypes/paragraph';

const parentsGridColumns = {
  group1: 6,
  group2: 6,
  group3: 6,
  group4: 8,
  group5: 10,
};

const componentsToRender = { fragment, urlLink: InlineLink, inline: Inline };

const ParagraphContainer = ({ blocks }) => {
  const { script, service } = useContext(ServiceContext);

  return (
    <Grid columns={parentsGridColumns}>
      <Grid
        item
        columns={{ group1: 6, group2: 6, group3: 6, group4: 8, group5: 10 }}
      >
        <Paragraph script={script} service={service}>
          <Blocks blocks={blocks} componentsToRender={componentsToRender} />
        </Paragraph>
      </Grid>
    </Grid>
  );
};

ParagraphContainer.propTypes = paragraphModelPropTypes;

ParagraphContainer.defaultProps = {
  parentsGridColumns: {
    group1: 6,
    group2: 6,
    group3: 6,
    group4: 8,
    group5: 10,
  },
};

export default ParagraphContainer;
