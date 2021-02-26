import loadable from '@loadable/component';

const loadableConfig = {
  arabic: loadable(() => import('./arabic.js')),
  burmese: loadable(() => import('./burmese.js')),
  gahuza: loadable(() => import('./gahuza.js')),
  hausa: loadable(() => import('./hausa.js')),
  hindi: loadable(() => import('./hindi.js')),
  indonesia: loadable(() => import('./indonesia.js')),
  marathi: loadable(() => import('./marathi.js')),
  nepali: loadable(() => import('./nepali.js')),
  persian: loadable(() => import('./persian.js')),
  portuguese: loadable(() => import('./portuguese.js')),
  russian: loadable(() => import('./russian.js')),
  zhongwen: loadable(() => import('./zhongwen.js')),
};

export default loadableConfig;
