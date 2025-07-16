import React from 'react';
import Blocks from '#app/legacy/containers/Blocks';
import { OptimoBlock } from '#app/models/types/optimo';
import fragment from '../Fragment';
import InlineLink from '../DecoratedInlineLink';
import Text from '../Text';

const componentsToRender = { fragment, urlLink: InlineLink };

const InlineContainer = ({ blocks, language }: Props) => {
  return (
    <Text className="pb-triple m-0" lang={language}>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </Text>
  );
};

type Props = {
  blocks: OptimoBlock[];
  language: string;
};

export default InlineContainer;
