import loadable from '@loadable/component';
import pipe from 'ramda/src/pipe';
import withContexts from '#containers/PageHandlers/withContexts';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import withError from '#containers/PageHandlers/withError';
import withLoading from '#containers/PageHandlers/withLoading';
import withData from '#containers/PageHandlers/withData';
import withVariant from '#containers/PageHandlers/withVariant';

const LoadableArticlePage = loadable(() =>
  import(/* webpackPrefetch: true */ './ArticlePage'),
);
const LoadableFrontPage = loadable(() =>
  import(/* webpackPrefetch: true */ './FrontPage'),
);
const LoadableMediaAssetPage = loadable(() =>
  import(/* webpackPrefetch: true */ './MediaAssetPage'),
);
const LoadablePhotoGalleryPage = loadable(() =>
  import(/* webpackPrefetch: true */ './PhotoGalleryPage'),
);
const LoadableRadioPage = loadable(() =>
  import(/* webpackPrefetch: true */ './RadioPage'),
);
const LoadableStoryPage = loadable(() =>
  import(/* webpackPrefetch: true */ './StoryPage'),
);

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
