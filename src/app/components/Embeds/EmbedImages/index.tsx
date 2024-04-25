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
  const { isAmp, env, isCaf } = useContext(RequestContext);
  const ampImage = embedImages?.[1]?.model?.blocks;
  const canonicalImage = embedImages?.[2]?.model?.blocks;
  const image = isAmp ? ampImage : canonicalImage;
  const rawImage = image?.[1]?.model;
  if (!rawImage) return null;

  const idt2EnvUrlSubPath = env === 'live' ? 'idt2' : 'idt2-test';
  const { width, height, locator } = rawImage;

  const sanitizedLocator = locator?.replace(/^\//, '');

  const embedSrc = `${
    getEnvConfig().SIMORGH_ICHEF_BASE_URL
  }/news/${width}/${idt2EnvUrlSubPath}/${sanitizedLocator}`;
  // might be defaulting to test so this doesn't work for assets e.g. http://localhost:7080/mundo/noticias-65353939?renderer_env=caflive
  // but does work for http://localhost:7080/gahuza/23313911?renderer_env=caftest
  const includeSrc = `${
    getEnvConfig().SIMORGH_INCLUDES_BASE_URL
  }/${sanitizedLocator}`;

  const src = isCaf ? includeSrc : embedSrc;
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
