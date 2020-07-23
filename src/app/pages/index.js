import loadable from '@loadable/component';
import pipe from 'ramda/src/pipe';
import withContexts from '#containers/PageHandlers/withContexts';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import withError from '#containers/PageHandlers/withError';
import withLoading from '#containers/PageHandlers/withLoading';
import withData from '#containers/PageHandlers/withData';
import withVariant from '#containers/PageHandlers/withVariant';

const applyBasicPageHandlers = pipe(
  withData,
  withError,
  withLoading,
  withPageWrapper,
  withContexts,
);

const applyErrorPageHandlers = pipe(withLoading, withPageWrapper, withContexts);

export const ArticlePage = pipe(
  applyBasicPageHandlers,
  withVariant,
)(loadable(() => import('./ArticlePage')));

export const ErrorPage = applyErrorPageHandlers(
  loadable(() => import('./ErrorPage')),
);

export const FrontPage = pipe(
  applyBasicPageHandlers,
  withVariant,
)(loadable(() => import('./FrontPage')));

export const MediaAssetPage = applyBasicPageHandlers(
  loadable(() => import('./MediaAssetPage')),
);

export const MostReadPage = applyBasicPageHandlers(
  loadable(() => import('./MostReadPage')),
);

export const PhotoGalleryPage = applyBasicPageHandlers(
  loadable(() => import('./PhotoGalleryPage')),
);

export const LiveRadioPage = applyBasicPageHandlers(
  loadable(() => import('./LiveRadioPage')),
);

export const OnDemandRadioPage = applyBasicPageHandlers(
  loadable(() => import('./OnDemandRadioPage')),
);

export const OnDemandTvPage = applyBasicPageHandlers(
  loadable(() => import('./OnDemandTvPage')),
);

export const StoryPage = applyBasicPageHandlers(
  loadable(() => import('./StoryPage')),
);

export const IdxPage = applyBasicPageHandlers(
  loadable(() => import('./IdxPage')),
);
