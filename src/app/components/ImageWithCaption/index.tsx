/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext } from 'react';
import buildIChefURL from '../../lib/utilities/ichefURL';
import urlWithPageAnchor from '../../lib/utilities/pageAnchor';
import { createSrcsets } from '../../lib/utilities/srcSet';
import filterForBlockType from '../../lib/utilities/blockHandlers';
import Copyright from '../Copyright';
import Caption from '../Caption';
import Image from '../Image';
import styles from './index.styles';
import { RequestContext } from '../../contexts/RequestContext';

const DEFAULT_IMAGE_RES = 640;
const LAZYLOAD_FROM_BLOCK = 4;

// @ts-expect-error - TODO: fix types for blocks
const getText = ({ model }) => model.blocks[0].model.blocks[0].model.text;

const getCopyright = (copyrightHolder: string) => {
  if (copyrightHolder === 'BBC') {
    return undefined;
  }

  return copyrightHolder;
};

const shouldLazyLoad = (position: number[]) =>
  !!urlWithPageAnchor() || position[0] > LAZYLOAD_FROM_BLOCK;

const renderCopyright = (copyright: string) =>
  copyright && <Copyright>{copyright}</Copyright>;

const renderCaption = (block: object, type: string) =>
  // @ts-expect-error - TODO: fix types for blocks
  block && <Caption block={block} type={type} />;

type Props = {
  blocks: object[];
  className?: string;
  position?: number[];
  sizes?: string;
  shouldPreload?: boolean;
};

const ImageWithCaption = ({
  blocks,
  className,
  position = [1],
  sizes,
  shouldPreload,
}: Props) => {
  const { isAmp, isLite } = useContext(RequestContext);

  if (isLite) return null;
  if (!blocks) return null;

  const rawImageBlock = filterForBlockType(blocks, 'rawImage');
  const altTextBlock = filterForBlockType(blocks, 'altText');
  const captionBlock = filterForBlockType(blocks, 'caption');

  const shouldPreloadLeadImage =
    position[0] <= LAZYLOAD_FROM_BLOCK && shouldPreload;

  if (!rawImageBlock || !altTextBlock) {
    return null;
  }

  const { locator, originCode, copyrightHolder, height, width } =
    rawImageBlock.model;

  const alt = getText(altTextBlock);

  const copyright = getCopyright(copyrightHolder);

  const src = buildIChefURL({
    originCode,
    locator,
    resolution: DEFAULT_IMAGE_RES,
  });

  const { primarySrcset, primaryMimeType, fallbackSrcset, fallbackMimeType } =
    createSrcsets({
      originCode,
      locator,
      originalImageWidth: width,
    });

  const lazyLoad = shouldLazyLoad(position);

  return (
    <figure className={className} css={styles.figure}>
      <Image
        alt={alt}
        attribution={copyright}
        src={src}
        height={height}
        width={width}
        lazyLoad={lazyLoad}
        preload={shouldPreloadLeadImage}
        srcSet={primarySrcset || undefined}
        fallbackSrcSet={fallbackSrcset || undefined}
        mediaType={primaryMimeType || undefined}
        fallbackMediaType={fallbackMimeType || undefined}
        sizes={!isAmp ? sizes : undefined}
        isAmp={isAmp}
        placeholder
        hasCaption
      >
        {renderCopyright(copyright || '')}
      </Image>
      {captionBlock && renderCaption(captionBlock, 'image')}
    </figure>
  );
};

export default ImageWithCaption;
