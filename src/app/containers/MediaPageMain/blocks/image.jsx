import React from 'react';
import Figure from '@bbc/psammead-figure';
import Caption from '@bbc/psammead-caption';
import Copyright from '../../Copyright';
import ImageWithPlaceholder from '../../ImageWithPlaceholder';
import createSrcset from '../../Image/helpers/srcSet';
import getOriginCode from '../../StoryPromo/imageSrcHelpers/originCode';
import getLocator from '../../StoryPromo/imageSrcHelpers/locator';

/* eslint-disable react/prop-types */
const ImageContainer = ({
  altText,
  path,
  height,
  width,
  copyrightHolder,
  caption,
  script,
  service,
}) => {
  const ratio = (height / width) * 100;
  const originCode = getOriginCode(path);
  const locator = getLocator(path);
  const imageResolutions = [70, 95, 144, 183, 240, 320, 480, 624];
  const srcset = createSrcset(originCode, locator, width, imageResolutions);
  const sizes = '(max-width: 600px) 100vw, (max-width: 1008px) 33vw, 237px';
  const DEFAULT_IMAGE_RES = 660;
  const src = `https://ichef.bbci.co.uk/news/${DEFAULT_IMAGE_RES}${path}`;

  return (
    <Figure>
      <ImageWithPlaceholder
        ratio={ratio || null}
        alt={altText}
        copyright={copyrightHolder}
        src={src}
        height={height}
        width={width}
        lazyLoad
        fade
        srcset={srcset}
        sizes={sizes}
      >
        {copyrightHolder && <Copyright>{copyrightHolder}</Copyright>}
      </ImageWithPlaceholder>

      {caption && (
        <Caption script={script} service={service}>
          {caption}
        </Caption>
      )}
    </Figure>
  );
};

export default ImageContainer;
