/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PropsWithChildren } from 'react';
// import { OptimoBlock } from '#app/models/types/optimo';
import Image from '../../Image';
// import styles from './index.styles';

export interface OptimoImageBlock {
  type: string;
  model: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blocks: any;
  };
}

type Props = {
  blocks: OptimoImageBlock[];
};

const EmbedImages = ({ blocks: embedImages }: PropsWithChildren<Props>) => {
  const image = embedImages?.slice(-1)?.[0]?.model?.blocks;
  const rawImage = image?.[1]?.model;
  if (!rawImage) return null;

  const { width, height, locator } = rawImage;

  const src = process.env.SIMORGH_INCLUDES_BASE_URL + locator;
  const alt =
    image?.[0]?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.blocks?.[0]
      ?.model?.text;

  if (!locator || !alt || !width || !height) return null;

  return <Image src={src} alt={alt} width={width} height={height} />;
};

export default EmbedImages;
