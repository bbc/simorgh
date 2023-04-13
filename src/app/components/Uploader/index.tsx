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
    <section role="region" aria-labelledby={id}>
      <Heading level={2}>{title as string}</Heading>
      <Paragraph>{text as string}</Paragraph>
      <a href={linkAddress as string}>
        <div>
          <Text size="pica" fontVariant="sansBold">
            {linkText as string}
            {isRtl ? <LeftChevron /> : <RightChevron />}
          </Text>
        </div>
      </a>
    </section>
  );
};

export default Uploader;
