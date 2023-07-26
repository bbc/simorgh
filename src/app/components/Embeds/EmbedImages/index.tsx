/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PropsWithChildren, useContext } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import Image from '../../Image';

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
  const { isAmp, env } = useContext(RequestContext);
  const ampImage = embedImages?.[1]?.model?.blocks;
  const canonicalImage = embedImages?.[2]?.model?.blocks;
  const image = isAmp ? ampImage : canonicalImage;
  const rawImage = image?.[1]?.model;
  if (!rawImage) return null;

  const idt2EnvUrlSubPath = env === 'live' ? 'idt2' : 'idt2-test';
  const { width, height, locator } = rawImage;

  const src = `${process.env.SIMORGH_ICHEF_BASE_URL}/news/${width}/${idt2EnvUrlSubPath}${locator}`;
  const alt =
    image?.[0]?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.blocks?.[0]
      ?.model?.text;

  if (!locator || !alt || !width || !height) return null;

  return <Image src={src} alt={alt} width={width} height={height} />;
};

export default EmbedImages;
