/** @jsx jsx */
import { jsx } from '@emotion/react';
import Blocks from '#app/legacy/containers/Blocks';
import { OptimoBlock } from '#app/models/types/optimo';
import fragment from '../Fragment';
import InlineLink from '../DecoratedInlineLink';
import Text from '../Text';
import styles from './index.style';

const componentsToRender = { fragment, urlLink: InlineLink };

const InlineContainer = ({ blocks, language }: Props) => {
  return (
    <Text css={styles.inline} lang={language}>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </Text>
  );
};

type Props = {
  blocks: OptimoBlock[];
  language: string;
};

export default InlineContainer;
