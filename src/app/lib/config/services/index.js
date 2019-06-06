/* eslint-disable global-require */
export const syncServices = {
  news: require('./news.js'),
  persian: require('./persian.js'),
  igbo: require('./igbo.js'),
  pidgin: require('./pidgin.js'),
  thai: require('./thai.js'),
  yoruba: require('./yoruba.js'),
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
