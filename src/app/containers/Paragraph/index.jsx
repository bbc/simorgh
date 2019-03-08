import React from 'react';
import Paragraph from '@bbc/psammead-paragraph';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import InlineLink from '../InlineLink';
import { paragraphModelPropTypes } from '../../models/propTypes/paragraph';
import { GridItemConstrainedMedium } from '../../lib/styledGrid';

const componentsToRender = { fragment, urlLink: InlineLink };

const ParagraphContainer = ({ blocks }) => (
  <GridItemConstrainedMedium>
    <Paragraph>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </Paragraph>
  </GridItemConstrainedMedium>
);

ParagraphContainer.propTypes = paragraphModelPropTypes;

export default ParagraphContainer;
