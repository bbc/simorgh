/** @jsx jsx */
import { useContext } from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { jsx } from '@emotion/react';
import { ServiceContext } from '../../../contexts/ServiceContext';
import Paragraph from '../../Paragraph';
import Text from '../../Text';
import styles from './index.styles';
import { LeftChevron, RightChevron } from '../../icons';
import CallToActionLink from '../../CallToActionLink';
import idSanitiser from '../../../lib/utilities/idSanitiser';

interface UploaderProps {
  blocks?: object[];
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

  if (!blocks || !blocks.length) return null;

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

  const id = idSanitiser(title);

  return (
    <section role="region" aria-labelledby={id} css={styles.container}>
      <div css={styles.card}>
        <Text as="strong" fontVariant="sansBold" size="paragon" id={id}>
          {title}
        </Text>
        <Paragraph css={styles.text}>{text}</Paragraph>
        <div css={styles.linkContainer}>
          <CallToActionLink href={linkAddress} css={styles.callToActionLink}>
            {linkText}
            {isRtl ? (
              <LeftChevron css={styles.chevron} />
            ) : (
              <RightChevron css={styles.chevron} />
            )}
          </CallToActionLink>
        </div>
      </div>
    </section>
  );
};

export default Uploader;
