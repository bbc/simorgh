import React from 'react';
import { string, number, objectOf, any, bool } from 'prop-types';
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
} from '../../lib/styledGrid';

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
  }

  return <p>Figure</p>;
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
