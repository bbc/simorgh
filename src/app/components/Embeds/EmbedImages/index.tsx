/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PropsWithChildren, useContext } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import styles from './index.styles';
import Image from '../../Image';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blocks: any;
};

const EmbedImages = ({ blocks: embedImages }: PropsWithChildren<Props>) => {
  const { isAmp, env, isLite } = useContext(RequestContext);
  const ampImage = embedImages?.[1]?.model?.blocks;
  const canonicalImage = embedImages?.[2]?.model?.blocks;
  const image = isAmp ? ampImage : canonicalImage;
  const rawImage = image?.[1]?.model;
  if (!rawImage) return null;

  if (isLite) return null;

  const idt2EnvUrlSubPath = env === 'live' ? 'idt2' : 'idt2-test';
  const { width, height, locator } = rawImage;

  const sanitizedLocator = locator?.replace(/^\//, '');

  const src = `${
    getEnvConfig().SIMORGH_ICHEF_BASE_URL
  }/news/${width}/${idt2EnvUrlSubPath}/${sanitizedLocator}`;
  const alt =
    image?.[0]?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.blocks?.[0]
      ?.model?.text;

  if (!locator || !alt || !width || !height) return null;

  return (
    <div css={styles.embedDiv} data-e2e="embed-image">
      <Image src={src} alt={alt} width={width} height={height} isAmp={isAmp} />
    </div>
  );
};

export default EmbedImages;
