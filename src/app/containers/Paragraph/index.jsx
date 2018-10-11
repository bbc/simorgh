import React from 'react';
import Paragraph from '../../components/Paragraph';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import InlineLink from '../InlineLink/index.new';
import { paragraphModelPropTypes } from '../../models/propTypes/paragraph';

const componentsToRender = { fragment, urlLink: InlineLink };

const ParagraphContainer = ({ blocks }) => (
  <Paragraph>
    <Blocks blocks={blocks} componentsToRender={componentsToRender} />
  </Paragraph>
);

ParagraphContainer.propTypes = paragraphModelPropTypes;

export default ParagraphContainer;
