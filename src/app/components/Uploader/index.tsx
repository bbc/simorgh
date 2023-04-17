/** @jsxRuntime classic */
/** @jsx jsx */
import { useContext } from 'react';
import path from 'ramda/src/path';
import { jsx } from '@emotion/react';
import { ServiceContext } from '../../contexts/ServiceContext';
import Heading from '../Heading';
import Paragraph from '../Paragraph';
import Text from '../Text';
import { LeftChevron, RightChevron } from '../icons';
import styles from './index.styles';

interface UploaderProps {
  blocks: object[];
}

const Uploader = ({ blocks }: UploaderProps) => {
  const { dir } = useContext(ServiceContext);
  const isRtl = dir === 'rtl';

  const type = path([0, 'type'], blocks); // aresUploader
  if (type !== 'aresUploader') return null;

  const uploaderBlocks = path([0, 'model', 'blocks'], blocks);

  const title = path(
    [0, 'model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
    uploaderBlocks,
  );

  const text = path(
    [1, 'model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
    uploaderBlocks,
  );

  const linkText = path(
    [
      2,
      'model',
      'blocks',
      0,
      'model',
      'blocks',
      0,
      'model',
      'blocks',
      0,
      'model',
      'text',
    ],
    uploaderBlocks,
  );

  const linkAddress = path(
    [
      2,
      'model',
      'blocks',
      0,
      'model',
      'blocks',
      0,
      'model',
      'blocks',
      0,
      'model',
      'locator',
    ],
    uploaderBlocks,
  );

  const id = `${(title as string).replaceAll(' ', '-')}`;

  return (
    <section role="region" aria-labelledby={id} css={styles.container}>
      <div css={styles.card}>
        <Heading level={2} size="paragon" css={styles.heading} id={id}>
          {title as string}
        </Heading>
        <Paragraph>{text as string}</Paragraph>
        <div css={styles.linkContainer}>
          <a href={linkAddress as string} css={styles.linkBackground}>
            <Text size="pica" fontVariant="sansBold" css={styles.link}>
              {linkText as string}
              {isRtl ? (
                <LeftChevron css={styles.chevron} />
              ) : (
                <RightChevron css={styles.chevron} />
              )}
            </Text>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Uploader;
