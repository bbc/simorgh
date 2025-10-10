import React from 'react';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import InlineLink from '../InlineLink';
import InlineSpan from '../../components/InlineSpan';

const componentsToRender = { fragment, urlLink: InlineLink };

const InlineContainer = ({ blocks, language }) => {
  return (
    <InlineSpan lang={language}>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </InlineSpan>
  );
};

export default InlineContainer;
