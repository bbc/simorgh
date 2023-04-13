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
  title: string;
  text: string;
  link: string;
}

const Uploader = ({ blocks }: UploaderProps) => {
  // const type = path([0, 'type'], blocks);
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

  const { dir } = useContext(ServiceContext);
  const isRtl = dir === 'rtl';

  const id = `${(title as string).replaceAll(' ', '-')}`;

  return (
    <section role="region" aria-labelledby={id} css={styles.container}>
      <div css={styles.card}>
        <Heading level={2} size="paragon" css={styles.heading}>
          {title as string}
        </Heading>
        <Paragraph css={styles.paragraph}>{text as string}</Paragraph>
        <a href={linkAddress as string} css={styles.linkBackground}>
          <div>
            <Text size="pica" fontVariant="sansBold" css={styles.link}>
              {linkText as string}
              {isRtl ? (
                <LeftChevron css={styles.chevron} />
              ) : (
                <RightChevron css={styles.chevron} />
              )}
            </Text>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Uploader;
