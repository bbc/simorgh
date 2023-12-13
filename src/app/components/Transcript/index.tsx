/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import Text from '../../legacy/containers/Text';
import Blocks from '../../legacy/containers/Blocks';
import styles from './index.styles';
import useOperaMiniDetection from '../../hooks/useOperaMiniDetection';
// import { GridItemLarge } from '../../legacy/components/Grid';

const componentsToRender = { text: Text };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Transcript = ({ blocks }: any) => {
  const isOperaMini = useOperaMiniDetection();
  if (isOperaMini) {
    // TODO - update
    return null;
  }
  return (
    <details css={styles.transcript}>
      <summary>Show Transcript</summary>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </details>
  );
};

export default Transcript;
