/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PropsWithChildren, useContext } from 'react';
// import { OptimoBlock } from '#app/models/types/optimo';
import { RequestContext } from '#app/contexts/RequestContext';
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
  const { isAmp } = useContext(RequestContext);
  const ampImage = embedImages?.[1]?.model?.blocks;
  const canonicalImage = embedImages?.slice(-1)?.[0]?.model?.blocks;
  const image = isAmp ? ampImage : canonicalImage;
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
