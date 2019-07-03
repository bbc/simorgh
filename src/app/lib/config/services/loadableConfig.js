/*
 * This config is used by `createLoadableContext`
 * to dynamically load each service's config.
 */
const loadableConfig = {
  news: {
    loader: () => import(/* webpackChunkName: 'news' */ './news.js'),
    webpack: () => [require.resolveWeak('./news.js')],
  },
  persian: {
    loader: () => import(/* webpackChunkName: 'persian' */ './persian.js'),
    webpack: () => [require.resolveWeak('./persian.js')],
  },
  igbo: {
    loader: () => import(/* webpackChunkName: 'igbo' */ './igbo.js'),
    webpack: () => [require.resolveWeak('./igbo.js')],
  },
  pidgin: {
    loader: () => import(/* webpackChunkName: 'pidgin' */ './pidgin.js'),
    webpack: () => [require.resolveWeak('./pidgin.js')],
  },
  yoruba: {
    loader: () => import(/* webpackChunkName: 'yoruba' */ './yoruba.js'),
    webpack: () => [require.resolveWeak('./yoruba.js')],
  },
};

export default loadableConfig;
