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

export default syncServices;
