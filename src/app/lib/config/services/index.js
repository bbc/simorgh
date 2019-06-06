/* eslint-disable global-require */
export const syncServices = {
  default: require('./default.js').default,
  news: require('./news.js').default,
  persian: require('./persian.js').default,
  igbo: require('./igbo.js').default,
  pidgin: require('./pidgin.js').default,
  thai: require('./thai.js').default,
  yoruba: require('./yoruba.js').default,
};

const dynamicServices = {
  news: () => import(/* webpackChunkName: 'news' */ './news.js'),
  persian: () => import(/* webpackChunkName: 'persian' */ './persian.js'),
  igbo: () => import(/* webpackChunkName: 'igbo' */ './igbo.js'),
  pidgin: () => import(/* webpackChunkName: 'pidgin' */ './pidgin.js'),
  thai: () => import(/* webpackChunkName: 'thai' */ './thai.js'),
  yoruba: () => import(/* webpackChunkName: 'yoruba' */ './yoruba.js'),
};

export default dynamicServices;
