import loadable from '@loadable/component';
import pipe from 'ramda/src/pipe';
import withContexts from '#containers/PageHandlers/withContexts';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import withError from '#containers/PageHandlers/withError';
import withLoading from '#containers/PageHandlers/withLoading';
import withData from '#containers/PageHandlers/withData';
import withVariant from '#containers/PageHandlers/withVariant';

const LoadableArticlePage = loadable(() => import('./ArticlePage'));
const LoadableFrontPage = loadable(() => import('./FrontPage'));
const LoadableMediaAssetPage = loadable(() => import('./MediaAssetPage'));
const LoadablePhotoGalleryPage = loadable(() => import('./PhotoGalleryPage'));
const LoadableRadioPage = loadable(() => import('./RadioPage'));
const LoadableStoryPage = loadable(() => import('./StoryPage'));

const applyBasicPageHandlers = pipe(
  withData,
  withError,
  withLoading,
  withPageWrapper,
  withContexts,
);

export const ArticlePage = pipe(
  applyBasicPageHandlers,
  withVariant,
)(LoadableArticlePage);
export const FrontPage = pipe(
  applyBasicPageHandlers,
  withVariant,
)(LoadableFrontPage);
export const MediaAssetPage = applyBasicPageHandlers(LoadableMediaAssetPage);
export const PhotoGalleryPage = applyBasicPageHandlers(
  LoadablePhotoGalleryPage,
);
export const RadioPage = applyBasicPageHandlers(LoadableRadioPage);
export const StoryPage = applyBasicPageHandlers(LoadableStoryPage);
