import React from 'react';
import Paragraph from '@bbc/psammead-paragraph';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import InlineLink from '../InlineLink';
import { paragraphModelPropTypes } from '../../models/propTypes/paragraph';

const componentsToRender = { fragment, urlLink: InlineLink };

const ParagraphContainer = ({ blocks }) => (
  <Paragraph>
    <Blocks blocks={blocks} componentsToRender={componentsToRender} />
  </Paragraph>
);

ParagraphContainer.propTypes = paragraphModelPropTypes;

export default ParagraphContainer;
