import loadable from '@loadable/component';

export const ArticlePage = loadable(() => import('./ArticlePage'));

export const ErrorPage = loadable(() => import('./ErrorPage'));

export const FrontPage = loadable(() => import('./FrontPage'));

export const MediaAssetPage = loadable(() => import('./MediaAssetPage'));

export const MostReadPage = loadable(() => import('./MostReadPage'));

export const PhotoGalleryPage = loadable(() => import('./PhotoGalleryPage'));

export const LiveRadioPage = loadable(() => import('./LiveRadioPage'));

export const OnDemandRadioPage = loadable(() => import('./OnDemandRadioPage'));

export const OnDemandTvPage = loadable(() => import('./OnDemandTvPage'));

export const StoryPage = loadable(() => import('./StoryPage'));

export const IdxPage = loadable(() => import('./IdxPage'));
