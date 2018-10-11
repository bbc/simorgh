import React from 'react';
import Paragraph from '../../components/Paragraph';
import Blocks from '../Blocks';
import { paragraphModelPropTypes } from '../../models/propTypes/paragraph';

const textDirection = script => (script === 'arabic' ? 'rtl' : 'ltr');

const ParagraphContainer = ({
  blocks,
  componentsToRender,
  lang = '',
  script,
}) => (
  // ToDo: only add lang and dir attributes if the lang and dir are different from the parent element

  <Paragraph dir={textDirection(script)} lang={lang}>
    <Blocks blocks={blocks} componentsToRender={componentsToRender} />
  </Paragraph>
);

ParagraphContainer.propTypes = paragraphModelPropTypes;

export default ParagraphContainer;
