import loadable from 'next/dynamic';

export const themes = {
  mundo: loadable(
    () => import(/* webpackChunkName: "themes-mundo" */ './mundo/mundo'),
  ),
};

export default themes;
