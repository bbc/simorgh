import loadable from '@loadable/component';

export const themes = {
  mundo: loadable(
    () => import(/* webpackChunkName: "themes-mundo" */ './mundo/mundo'),
  ),
};

export default themes;
