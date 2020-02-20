import React from 'react';
import { string, number, objectOf, any, bool } from 'prop-types';
import Figure from '@bbc/psammead-figure';
import Copyright from '../Copyright';
import Caption from '../Caption';
import ImageWithPlaceholder from '../ImageWithPlaceholder';
import {
  NestedGridParentLarge,
  NestedGridParentMedium,
  NestedGridParentSmall,
  NestedGridItemChildSmall,
  NestedGridItemChildMedium,
  NestedGridItemChildLarge,
} from '#lib/styledGrid';

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
  const imageSpan = {
    default: '6',
    group5: '12',
  };
  let ParentWrapper = NestedGridParentLarge;
  let ChildWrapper = NestedGridItemChildLarge;

  if (height === width) {
    ParentWrapper = NestedGridParentMedium;
    ChildWrapper = NestedGridItemChildMedium;
  }
  if (height > width) {
    ParentWrapper = NestedGridParentSmall;
    ChildWrapper = NestedGridItemChildSmall;
    imageSpan.default = '4';
    imageSpan.group1 = '6';
  }

  return (
    <Figure>
      <ParentWrapper>
        <ChildWrapper
          gridColumnStart={1}
          marginLeft={{
            group3: '1em',
          }}
          gridSpan={imageSpan}
        >
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
        </ChildWrapper>
        <ChildWrapper
          gridColumnStart={1}
          gridSpan={{
            default: '6',
            group3: '5',
            group4: '5',
            group5: '10',
          }}
        >
          {renderCaption(captionBlock, type)}
        </ChildWrapper>
      </ParentWrapper>
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
