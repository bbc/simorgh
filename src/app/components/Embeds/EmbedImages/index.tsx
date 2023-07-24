/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PropsWithChildren } from 'react';
// import { OptimoBlock } from '#app/models/types/optimo';
import Image from '../../Image';
// import styles from './index.styles';

// interface OptimoImageBlock {
//   type: 'image';
//   model: {
//     blocks: OptimoBlock[];
//   };
// }

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  embedImages: any;
};

const EmbedImages = ({ embedImages }: PropsWithChildren<Props>) => {
  const image =
    embedImages?.model?.blocks?.slice(-1)[0]?.model?.blocks[1]?.model;

  const { width, height, locator } = image;

  const src = process.env.SIMORGH_INCLUDES_BASE_URL + locator;
  const alt =
    image?.model?.blocks[0]?.model?.blocks[0]?.model?.blocks[0]?.model?.text;

  if (!locator || !alt || !width || !height) return null;

  return <Image src={src} alt={alt} width={width} height={height} />;
};

export default EmbedImages;
