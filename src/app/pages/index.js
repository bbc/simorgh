import pipe from 'ramda/src/pipe';
import _MediaAssetPage from './MediaAssetPage';
import _PhotoGalleryPage from './PhotoGalleryPage';
import _RadioPage from './RadioPage';
import _StoryPage from './StoryPage';
import withContexts from '../containers/PageHandlers/withContexts';
import withPageWrapper from '../containers/PageHandlers/withPageWrapper';
import withError from '../containers/PageHandlers/withError';
import withLoading from '../containers/PageHandlers/withLoading';
import withData from '../containers/PageHandlers/withData';

const applyBasicPageHandlers = pipe(
  withData,
  withError,
  withLoading,
  withPageWrapper,
  withContexts,
);

export const MediaAssetPage = applyBasicPageHandlers(_MediaAssetPage);
export const PhotoGalleryPage = applyBasicPageHandlers(_PhotoGalleryPage);
export const RadioPage = applyBasicPageHandlers(_RadioPage);
export const StoryPage = applyBasicPageHandlers(_StoryPage);
