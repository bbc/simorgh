/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import LegacyText from '../../legacy/containers/Text';
import Blocks from '../../legacy/containers/Blocks';
import styles from './index.styles';
import Text from '../Text';
// import useOperaMiniDetection from '../../hooks/useOperaMiniDetection';
import { GridItemLarge } from '../../legacy/components/Grid';

const componentsToRender = { text: LegacyText };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Transcript = ({ blocks }: any) => {
  // const isOperaMini = useOperaMiniDetection();
  // if (isOperaMini) {
  //   // TODO - update
  //   return null;
  // }
  return (
    <GridItemLarge>
      <details css={styles.transcript}>
        <summary css={styles.summary}>
          <Text size="pica" fontVariant="sansBold" css={styles.summaryTitle}>
            Read transcript
          </Text>
        </summary>
        <Blocks blocks={blocks} componentsToRender={componentsToRender} />
        <Text size="brevier">This transcript was auto generated.</Text>
      </details>
    </GridItemLarge>
  );
};

export default Transcript;
