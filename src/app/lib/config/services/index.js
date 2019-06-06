const dynamicServices = {
  news: () => import(/* webpackChunkName: 'news' */ './news.js'),
  persian: () => import(/* webpackChunkName: 'persian' */ './persian.js'),
  igbo: () => import(/* webpackChunkName: 'igbo' */ './igbo.js'),
  pidgin: () => import(/* webpackChunkName: 'pidgin' */ './pidgin.js'),
  thai: () => import(/* webpackChunkName: 'thai' */ './thai.js'),
  yoruba: () => import(/* webpackChunkName: 'yoruba' */ './yoruba.js'),
};

export default dynamicServices;
