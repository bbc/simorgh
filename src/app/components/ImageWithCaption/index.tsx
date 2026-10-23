import { use } from 'react';
import { createIchefSrcSet } from '#app/utilities/imageSrcSets';
import urlWithPageAnchor from '../../lib/utilities/pageAnchor';
import filterForBlockType from '../../lib/utilities/blockHandlers';
import Copyright from '../Copyright';
import Caption from '../Caption';
import Image from '../Image';
import styles from './index.styles';
import { RequestContext } from '../../contexts/RequestContext';

const DEFAULT_IMAGE_RES = 640;
const getText = ({ model }) => model.blocks[0].model.blocks[0].model.text;

const getCopyright = (copyrightHolder: string) => {
  if (copyrightHolder === 'BBC') {
    return undefined;
  }

  return copyrightHolder;
};

const shouldLazyLoad = (isLeadImage: boolean) =>
  !!urlWithPageAnchor() || !isLeadImage;

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
  isLeadImage?: boolean;
};

const ImageWithCaption = ({
  blocks,
  className,
  position = [1],
  sizes,
  shouldPreload,
  isLeadImage = position[0] === 1,
}: Props) => {
  const { isAmp, isLite } = use(RequestContext);

  if (isLite) return null;
  if (!blocks) return null;

  const rawImageBlock = filterForBlockType(blocks, 'rawImage');
  const altTextBlock = filterForBlockType(blocks, 'altText');
  const captionBlock = filterForBlockType(blocks, 'caption');

  const shouldPreloadLeadImage = isLeadImage && shouldPreload;

  if (!rawImageBlock || !altTextBlock) {
    return null;
  }

  const { locator, originCode, copyrightHolder, height, width } =
    rawImageBlock.model;

  const alt = getText(altTextBlock);

  const copyright = getCopyright(copyrightHolder);

  const {
    src,
    primarySrcset,
    primaryMimeType,
    fallbackSrcset,
    fallbackMimeType,
  } = createIchefSrcSet({
    originCode,
    locator,
    originalImageWidth: width,
    srcResolution: DEFAULT_IMAGE_RES,
  });

  const lazyLoad = shouldLazyLoad(isLeadImage);

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
        fetchPriority={shouldPreloadLeadImage ? 'high' : undefined}
        srcSet={primarySrcset || undefined}
        fallbackSrcSet={fallbackSrcset || undefined}
        mediaType={primaryMimeType || undefined}
        fallbackMediaType={fallbackMimeType || undefined}
        sizes={!isAmp ? sizes : undefined}
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
