/*
  Do not import this file into the primary application.
  This file is intended for use by tests only where needed. 
  Including this file in the application will cause the 
  bundle splitting to stop working.
*/
import news from './news';
import persian from './persian';
import igbo from './igbo';
import pidgin from './pidgin';
import yoruba from './yoruba';
import defaultConfig from './default';

export default {
  default: defaultConfig,
  news,
  persian,
  igbo,
  pidgin,
  yoruba,
};
