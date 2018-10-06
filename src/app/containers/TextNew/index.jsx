import React from 'react';
import { node, string } from 'prop-types';
import nanoid from 'nanoid';
import { textBlockNewPropTypes } from '../../models/propTypes/textnew';
import Paragraph from '../Paragraph';
import fragment from '../Fragment';
import urlLink from '../UrlLink';
import HorizontalRule from '../../components/HorizontalRule';

const componentsToRender = { fragment, urlLink };

const shouldPrependHR = typeOfPreviousBlock => typeOfPreviousBlock === 'text';

const textBlock = model => {
  const paragraphBlocks = model.blocks;
  return paragraphBlocks.map(({ model: childModel }) => (
    <Paragraph
      key={nanoid()}
      blocks={childModel.blocks}
      componentsToRender={componentsToRender}
      lang={childModel.lang}
      script={childModel.script}
    />
  ));
};

const TextWithFragmentsAndUrlLinks = ({ model, typeOfPreviousBlock }) => {
  if (!model) {
    return null;
  }

  const hr = shouldPrependHR(typeOfPreviousBlock) ? <HorizontalRule /> : null;

  return (
    <React.Fragment>
      {hr}
      {textBlock(model)}
    </React.Fragment>
  );
};

TextWithFragmentsAndUrlLinks.propTypes = {
  ...textBlockNewPropTypes,
  typeOfPreviousBlock: string,
};

TextWithFragmentsAndUrlLinks.defaultProps = {
  typeOfPreviousBlock: null,
};

urlLink.propTypes = {
  children: node.isRequired,
};

export default TextWithFragmentsAndUrlLinks;
