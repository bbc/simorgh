/** @jsxRuntime classic */
/** @jsx jsx */
import { useContext } from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { jsx } from '@emotion/react';
import { ServiceContext } from '../../contexts/ServiceContext';
import Paragraph from '../Paragraph';
import Text from '../Text';
import { LeftChevron, RightChevron } from '../icons';
import styles from './index.styles';

interface UploaderProps {
  blocks: object[] | undefined;
}

type UploaderBlock = {
  type: 'title' | 'text' | 'link';
  model: {
    blocks: object[];
  };
};

const Uploader = ({ blocks }: UploaderProps) => {
  const { dir } = useContext(ServiceContext);
  const isRtl = dir === 'rtl';

  if (blocks === undefined) return null;

  const type = path([0, 'type'], blocks); // aresUploader
  if (type !== 'aresUploader') return null;

  const uploaderBlocks = pathOr<UploaderBlock[]>(
    [],
    [0, 'model', 'blocks'],
    blocks,
  );

  const titleBlock = uploaderBlocks.find(block => block.type === 'title');
  const textBlock = uploaderBlocks.find(block => block.type === 'text');
  const linkBlock = uploaderBlocks.find(block => block.type === 'link');

  const title = pathOr<string>(
    '',
    ['model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
    titleBlock,
  );

  const text = pathOr<string>(
    '',
    ['model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
    textBlock,
  );

  const linkText = pathOr<string>(
    '',
    [
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
    linkBlock,
  );

  const linkAddress = pathOr<string>(
    '',
    [
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
    linkBlock,
  );

  const id = `${title.replaceAll(' ', '-')}`;

  return (
    <section role="region" aria-labelledby={id} css={styles.container}>
      <div css={styles.card}>
        <Text as="strong" fontVariant="sansBold" size="paragon" id={id}>
          {title}
        </Text>
        <Paragraph css={styles.text}>{text}</Paragraph>
        <div css={styles.linkContainer}>
          <a href={linkAddress} css={styles.linkBackground}>
            <Text size="pica" fontVariant="sansBold" css={styles.link}>
              {linkText}
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
