/** @jsx jsx */
import { jsx } from '@emotion/react';
import Blocks from '#app/legacy/containers/Blocks';
import { OptimoBlock } from '#app/models/types/optimo';
import fragment from '../Fragment';
import InlineLink from '../DecoratedInlineLink';
import Text from '../Text';
import styles from './index.style';

const componentsToRender = { fragment, urlLink: InlineLink };

const InlineContainer = ({ blocks }: Props) => {
  return (
    <Text css={styles.inline}>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </Text>
  );
};

type Props = {
  blocks: OptimoBlock[];
};

export default InlineContainer;
