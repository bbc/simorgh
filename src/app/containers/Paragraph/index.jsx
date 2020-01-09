import React, { useContext } from 'react';
import Paragraph from '@bbc/psammead-paragraph';
import { ServiceContext } from '#contexts/ServiceContext';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import InlineLink from '../InlineLink';
import Inline from '../InlineContainer';
import { paragraphModelPropTypes } from '#models/propTypes/paragraph';
import Grid, { ArticlePageGrid } from '#app/components/Grid';

const componentsToRender = { fragment, urlLink: InlineLink, inline: Inline };

const ParagraphContainer = ({ blocks }) => {
  const { script, service } = useContext(ServiceContext);

  return (
    <ArticlePageGrid>
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
        margins={{
          group0: true,
          group1: true,
          group2: true,
          group3: true,
        }}
      >
        <Paragraph script={script} service={service}>
          <Blocks blocks={blocks} componentsToRender={componentsToRender} />
        </Paragraph>
      </Grid>
    </ArticlePageGrid>
  );
};

ParagraphContainer.propTypes = paragraphModelPropTypes;

export default ParagraphContainer;
