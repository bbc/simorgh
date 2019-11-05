import React from 'react';
import { string, number, objectOf, any, bool } from 'prop-types';
import Figure from '@bbc/psammead-figure';
import Copyright from '../Copyright';
import Caption from '../Caption';
import ImageWithPlaceholder from '../ImageWithPlaceholder';
import Grid from '#app/components/Grid';

const renderCopyright = copyright =>
  copyright && <Copyright>{copyright}</Copyright>;

const renderCaption = (block, type, service) =>
  block && <Caption block={block} type={type} service={service} />;

const ArticleFigure = ({
  height,
  width,
  src,
  alt,
  copyright,
  ratio,
  fade,
  lazyLoad,
  captionBlock,
  type,
  srcset,
  showCopyright,
}) => {
  let imageOrientation = 'landscape';

  if (height === width) {
    imageOrientation = 'square';
  }
  if (height > width) {
    imageOrientation = 'portrait';
  }

  const figureLayouts = {
    landscape: {
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 6,
      group4: 6,
      group5: 12,
    },
    square: {
      group0: 5,
      group1: 5,
      group2: 5,
      group3: 5,
      group4: 5,
      group5: 10,
    },
    portrait: {
      group0: 6,
      group1: 6,
      group2: 4,
      group3: 5,
      group4: 4,
      group5: 8,
    },
  };

  const imageLayouts = {
    landscape: {
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 6,
      group4: 6,
      group5: 12,
    },
    square: {
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 6,
      group4: 6,
      group5: 12,
    },
    portrait: {
      group0: 4,
      group1: 4,
      group2: 4,
      group3: 4,
      group4: 4,
      group5: 8,
    },
  };

  const captionLayouts = {
    landscape: {
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 6,
      group4: 6,
      group5: 12,
    },
    square: {
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 6,
      group4: 6,
      group5: 12,
    },
    portrait: {
      group0: 6,
      group1: 6,
      group2: 4,
      group3: 5,
      group4: 4,
      group5: 8,
    },
  };

  const caption = renderCaption(captionBlock, type);

  return (
    <Figure>
      <Grid columns={figureLayouts[imageOrientation]}>
        <Grid item columns={imageLayouts[imageOrientation]}>
          <ImageWithPlaceholder
            ratio={ratio}
            alt={alt}
            copyright={copyright}
            src={src}
            height={height}
            width={width}
            lazyLoad={lazyLoad}
            fade={fade}
            srcset={srcset}
          >
            {showCopyright && renderCopyright(copyright)}
          </ImageWithPlaceholder>
        </Grid>
        {caption && (
          <Grid item columns={captionLayouts[imageOrientation]}>
            {caption}
          </Grid>
        )}
      </Grid>
    </Figure>
  );
};

ArticleFigure.propTypes = {
  alt: string.isRequired,
  captionBlock: objectOf(any),
  copyright: string,
  height: number,
  fade: bool,
  lazyLoad: bool,
  ratio: number.isRequired,
  src: string.isRequired,
  type: string,
  srcset: string,
  width: number.isRequired,
  showCopyright: bool,
};

ArticleFigure.defaultProps = {
  copyright: null,
  captionBlock: null,
  height: null,
  fade: false,
  lazyLoad: false,
  type: '',
  srcset: null,
  showCopyright: false,
};

export default ArticleFigure;
