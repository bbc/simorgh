import React, { use } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import Image from '#app/components/Image';
import { createSrcsets } from '#app/lib/utilities/srcSet';
import getOriginCode from '#app/lib/utilities/imageSrcHelpers/originCode';
import getLocator from '#app/lib/utilities/imageSrcHelpers/locator';

const MaskedImage = ({
  imageUrl,
  imageUrlTemplate,
  imageWidth,
  altText = '',
  showPlaceholder = true,
}: {
  imageUrl: string;
  imageUrlTemplate: string;
  imageWidth: number;
  altText?: string;
  showPlaceholder?: boolean;
}) => {
  const { dir } = use(ServiceContext);
  const isRtl = dir === 'rtl';

  const url = imageUrlTemplate.split('{width}')[1];

  const originCode = getOriginCode(url);
  const locator = getLocator(url);

  const { primarySrcset, primaryMimeType, fallbackSrcset, fallbackMimeType } =
    createSrcsets({
      originCode,
      locator,
      originalImageWidth: imageWidth,
    });

  const mobileImageMask = `
    linear-gradient(180deg, 
      rgba(0,0,0,1) 0%,
      rgba(255,255,255,0.99) 7%,
      rgba(255,255,255,0.98) 13%,
      rgba(255,255,255,0.97) 19%,
      rgba(255,255,255,0.96) 24%,
      rgba(255,255,255,0.95) 29%,
      rgba(255,255,255,0.93) 34%,
      rgba(255,255,255,0.91) 39%,
      rgba(255,255,255,0.89) 43%,
      rgba(255,255,255,0.87) 47%,
      rgba(255,255,255,0.84) 51%,
      rgba(255,255,255,0.82) 55%,
      rgba(255,255,255,0.78) 59%,
      rgba(255,255,255,0.75) 62%,
      rgba(255,255,255,0.7) 65%,
      rgba(255,255,255,0.65) 69%,
      rgba(255,255,255,0.61) 72%,
      rgba(255,255,255,0.55) 75%,
      rgba(255,255,255,0.49) 79%,
      rgba(255,255,255,0.42) 82%,
      rgba(255,255,255,0.35) 85%,
      rgba(255,255,255,0.27) 89%,
      rgba(255,255,255,0.19) 92%,
      rgba(255,255,255,0.1) 96%,
      rgba(255,255,255,0) 100%
    )
  `;

  const group4Mask = `
    rgba(0,0,0,1) 0%,
    rgba(0,0,0,1) 50%,
    rgba(0,0,0,1) 54%,
    rgba(255,255,255,0.98) 56%,
    rgba(255,255,255,0.96) 58%,
    rgba(255,255,255,0.93) 60%,
    rgba(255,255,255,0.89) 62%,
    rgba(255,255,255,0.84) 64%,
    rgba(255,255,255,0.8) 66%,
    rgba(255,255,255,0.74) 68%,
    rgba(255,255,255,0.68) 70%,
    rgba(255,255,255,0.62) 72%,
    rgba(255,255,255,0.56) 74%,
    rgba(255,255,255,0.5) 76%,
    rgba(255,255,255,0.44) 78%,
    rgba(255,255,255,0.38) 80%,
    rgba(255,255,255,0.32) 82%,
    rgba(255,255,255,0.26) 84%,
    rgba(255,255,255,0.2) 86%,
    rgba(255,255,255,0.16) 88%,
    rgba(255,255,255,0.11) 90%,
    rgba(255,255,255,0.07) 92%,
    rgba(255,255,255,0.04) 94%,
    rgba(255,255,255,0.02) 96%,
    rgba(255,255,255,0) 98%,
    rgba(255,255,255,0) 100%
  `;

  const extraWideMask = `
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.01) 2%,
    rgba(255,255,255,0.02) 3%,
    rgba(255,255,255,0.05) 4%,
    rgba(255,255,255,0.08) 5%,
    rgba(255,255,255,0.12) 6%,
    rgba(255,255,255,0.16) 7%,
    rgba(255,255,255,0.21) 8%,
    rgba(255,255,255,0.26) 9%,
    rgba(255,255,255,0.32) 10%,
    rgba(255,255,255,0.38) 11%,
    rgba(255,255,255,0.44) 12%,
    rgba(255,255,255,0.5) 13%,
    rgba(255,255,255,0.56) 14%,
    rgba(255,255,255,0.63) 15%,
    rgba(255,255,255,0.69) 16%,
    rgba(255,255,255,0.74) 17%,
    rgba(255,255,255,0.8) 18%,
    rgba(255,255,255,0.85) 19%,
    rgba(255,255,255,0.89) 20%,
    rgba(255,255,255,0.93) 21%,
    rgba(255,255,255,0.96) 22%,
    rgba(255,255,255,0.98) 23%,
    rgba(0,0,0,1) 24%,
    rgba(0,0,0,1) 25%,
    rgba(0,0,0,1) 50%,
    rgba(0,0,0,1) 54%,
    rgba(255,255,255,0.98) 56%,
    rgba(255,255,255,0.96) 58%,
    rgba(255,255,255,0.93) 60%,
    rgba(255,255,255,0.89) 62%,
    rgba(255,255,255,0.84) 64%,
    rgba(255,255,255,0.8) 66%,
    rgba(255,255,255,0.74) 68%,
    rgba(255,255,255,0.68) 70%,
    rgba(255,255,255,0.62) 72%,
    rgba(255,255,255,0.56) 74%,
    rgba(255,255,255,0.5) 76%,
    rgba(255,255,255,0.44) 78%,
    rgba(255,255,255,0.38) 80%,
    rgba(255,255,255,0.32) 82%,
    rgba(255,255,255,0.26) 84%,
    rgba(255,255,255,0.2) 86%,
    rgba(255,255,255,0.16) 88%,
    rgba(255,255,255,0.11) 90%,
    rgba(255,255,255,0.07) 92%,
    rgba(255,255,255,0.04) 94%,
    rgba(255,255,255,0.02) 96%,
    rgba(255,255,255,0) 98%,
    rgba(255,255,255,0) 100%
  `;

  return (
    <div
      className="
        aspect-video
        group-4:h-full
        group-4:max-w-[60%]
        group-4:object-cover
        group-4:absolute
        group-4:inset-inline-end-0
      "
      style={{
        maskSize: '100% 100%',
        maskImage: mobileImageMask,
        ...(window.innerWidth >= 1008 && {
          maskImage: isRtl 
            ? `linear-gradient(90deg, ${window.innerWidth >= 1280 ? extraWideMask : group4Mask})`
            : `linear-gradient(270deg, ${window.innerWidth >= 1280 ? extraWideMask : group4Mask})`,
        }),
      }}
    >
      <Image
        alt={altText}
        src={imageUrl}
        srcSet={primarySrcset || undefined}
        fallbackSrcSet={fallbackSrcset || undefined}
        mediaType={primaryMimeType || undefined}
        fallbackMediaType={fallbackMimeType || undefined}
        sizes="(min-width: 1008px) 660px, 100vw"
        width={800}
        height={533}
        fetchPriority="high"
        preload
        placeholder={showPlaceholder}
      />
    </div>
  );
};

export default MaskedImage;
