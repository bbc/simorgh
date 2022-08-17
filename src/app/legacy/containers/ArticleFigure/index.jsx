import React from 'react';
import {
  string,
  number,
  shape,
  arrayOf,
  oneOfType,
  object,
  bool,
} from 'prop-types';
import Figure from '#psammead/psammead-figure/src';
import Grid from '#components/Grid';
import Copyright from '../Copyright';
import Caption from '../Caption';
import ImageWithPlaceholder from '../ImageWithPlaceholder';

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
  preload,
  captionBlock,
  type,
  srcset,
  fallbackSrcset,
  primaryMimeType,
  fallbackMimeType,
  sizes,
  showCopyright,
}) => {
  let parentColumns = {
    group0: 6,
    group1: 6,
    group2: 6,
    group3: 6,
    group4: 6,
    group5: 12,
  };

  if (height === width) {
    parentColumns = {
      group0: 5,
      group1: 5,
      group2: 5,
      group3: 5,
      group4: 5,
      group5: 10,
    };
  }
  if (height > width) {
    parentColumns = {
      group0: 6,
      group1: 6,
      group2: 4,
      group3: 5,
      group4: 4,
      group5: 8,
    };
  }

  return (
    <Figure>
      <Grid enableGelGutters columns={parentColumns}>
        <Grid
          item
          startOffset={{
            group0: 1,
            group1: 1,
            group2: 1,
            group3: 1,
            group4: 1,
            group5: 1,
          }}
          columns={{
            group0: 6,
            group1: 6,
            group2: height > width ? 4 : 6,
            group3: height > width ? 4 : 6,
            group4: height > width ? 4 : 6,
            group5: height > width ? 10 : 12,
          }}
        >
          <ImageWithPlaceholder
            ratio={ratio}
            alt={alt}
            copyright={copyright}
            src={src}
            height={height}
            width={width}
            lazyLoad={lazyLoad}
            preload={preload}
            fade={fade}
            srcset={srcset}
            fallbackSrcset={fallbackSrcset}
            primaryMimeType={primaryMimeType}
            fallbackMimeType={fallbackMimeType}
            sizes={sizes}
          >
            {showCopyright && renderCopyright(copyright)}
          </ImageWithPlaceholder>
        </Grid>
        {captionBlock && (
          <Grid
            item
            startOffset={{
              group0: 1,
              group1: 1,
              group2: 1,
              group3: 1,
              group4: 1,
              group5: 1,
            }}
            columns={{
              group0: 6,
              group1: 6,
              group2: 6,
              group3: 5,
              group4: 5,
              group5: 10,
            }}
          >
            {renderCaption(captionBlock, type)}
          </Grid>
        )}
      </Grid>
    </Figure>
  );
};

ArticleFigure.propTypes = {
  alt: string.isRequired,
  captionBlock: shape({
    model: shape({
      blocks: arrayOf(oneOfType([string, object])),
    }),
  }),
  copyright: string,
  height: number,
  fade: bool,
  lazyLoad: bool,
  preload: bool,
  ratio: number.isRequired,
  src: string.isRequired,
  type: string,
  srcset: string,
  fallbackSrcset: string,
  primaryMimeType: string,
  fallbackMimeType: string,
  sizes: string,
  width: number.isRequired,
  showCopyright: bool,
};

ArticleFigure.defaultProps = {
  copyright: null,
  captionBlock: null,
  height: null,
  fade: false,
  lazyLoad: false,
  preload: false,
  type: '',
  srcset: null,
  fallbackSrcset: null,
  primaryMimeType: undefined,
  fallbackMimeType: undefined,
  sizes: null,
  showCopyright: false,
};

export default ArticleFigure;
