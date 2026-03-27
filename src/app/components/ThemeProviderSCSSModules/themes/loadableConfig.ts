import loadable from 'next/dynamic';

export const themes = {
  mundo: loadable(
    () => import(/* webpackChunkName: "themes-mundo" */ './mundo/mundo'),
  ),
  portuguese: loadable(
    () =>
      import(
        /* webpackChunkName: "themes-portuguese" */ './portuguese/portuguese'
      ),
  ),
};

export default themes;
