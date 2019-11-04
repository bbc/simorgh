import React, { useContext } from 'react';
import Paragraph from '@bbc/psammead-paragraph';
import { ServiceContext } from '#contexts/ServiceContext';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import InlineLink from '../InlineLink';
import inline from '../InlineContainer';
import { paragraphModelPropTypes } from '#models/propTypes/paragraph';
import Grid from '#app/components/Grid';

const componentsToRender = { fragment, urlLink: InlineLink, inline };

const ParagraphContainer = ({ blocks }) => {
  const { script, service } = useContext(ServiceContext);

  return (
    <Grid
      item
      startOffset={{
        group0: 1,
        group1: 1,
        group2: 1,
        group3: 1,
        group4: 2,
        group5: 5,
      }}
      columns={{
        group0: 6,
        group1: 6,
        group2: 6,
        group3: 5,
        group4: 5,
        group5: 10,
      }}
      enableGelMargins
    >
      <Paragraph script={script} service={service}>
        <Blocks blocks={blocks} componentsToRender={componentsToRender} />
      </Paragraph>
    </Grid>
  );
};

ParagraphContainer.propTypes = paragraphModelPropTypes;

export default ParagraphContainer;
