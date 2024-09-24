import loadable from '@loadable/component';

export const ArticlePage = loadable(() => import('./ArticlePage'));
export const MediaArticlePage = loadable(() => import('./MediaArticlePage'));
export const ErrorPage = loadable(() => import('./ErrorPage'));
export const FrontPage = loadable(() => import('./FrontPage'));
export const HomePage = loadable(() => import('./HomePage'));
export const MostReadPage = loadable(() => import('./MostReadPage'));
export const LiveRadioPage = loadable(() => import('./LiveRadioPage'));
export const OnDemandAudioPage = loadable(() => import('./OnDemandAudioPage'));
export const OnDemandTvPage = loadable(() => import('./OnDemandTvPage'));
export const TopicPage = loadable(() => import('./TopicPage'));
export const FeatureIdxPage = loadable(() => import('./FeatureIdxPage'));
