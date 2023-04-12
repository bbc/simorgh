import loadable from '@loadable/component';

export const ArticlePage = loadable(() => import('./ArticlePage/index.jsx'));
export const MediaArticlePage = loadable(() =>
  import('./MediaArticlePage/index.jsx'),
);
export const ErrorPage = loadable(() => import('./ErrorPage/index.jsx'));
export const FrontPage = loadable(() => import('./FrontPage/index.jsx'));
export const HomePage = loadable(() => import('./HomePage/index.tsx'));
export const MediaAssetPage = loadable(() =>
  import('./MediaAssetPage/index.jsx'),
);
export const MostReadPage = loadable(() => import('./MostReadPage/index.jsx'));
export const MostWatchedPage = loadable(() =>
  import('./MostWatchedPage/index.jsx'),
);
export const PhotoGalleryPage = loadable(() =>
  import('./PhotoGalleryPage/index.jsx'),
);
export const LiveRadioPage = loadable(() =>
  import('./LiveRadioPage/index.jsx'),
);
export const OnDemandAudioPage = loadable(() =>
  import('./OnDemandAudioPage/index.jsx'),
);
export const OnDemandTvPage = loadable(() =>
  import('./OnDemandTvPage/index.jsx'),
);
export const TopicPage = loadable(() => import('./TopicPage/index.jsx'));
export const StoryPage = loadable(() => import('./StoryPage/index.jsx'));
export const IdxPage = loadable(() => import('./IdxPage/index.jsx'));
export const FeatureIdxPage = loadable(() =>
  import('./FeatureIdxPage/index.jsx'),
);
