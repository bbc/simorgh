import React from 'react';
import Paragraph from '@bbc/psammead-paragraph';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import InlineLink from '../InlineLink';
import { ServiceContextConsumer } from '../../contexts/ServiceContext';
import { paragraphModelPropTypes } from '../../models/propTypes/paragraph';
import { GridItemConstrainedMedium } from '../../lib/styledGrid';

const componentsToRender = { fragment, urlLink: InlineLink };

const ParagraphContainer = ({ blocks }) => (
  <GridItemConstrainedMedium>
    <ServiceContextConsumer>
      {({ script }) => (
        <Paragraph script={script}>
          <Blocks blocks={blocks} componentsToRender={componentsToRender} />
        </Paragraph>
      )}
    </ServiceContextConsumer>
  </GridItemConstrainedMedium>
);

ParagraphContainer.propTypes = paragraphModelPropTypes;

export default ParagraphContainer;
