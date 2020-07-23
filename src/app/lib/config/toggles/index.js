import loadable from '@loadable/component';

const environmentToggles = {
  local: loadable(() => import('./local')),
  test: loadable(() => import('./test')),
  live: loadable(() => import('./live')),
};

const getToggles = () => {
  const environment = process.env.SIMORGH_APP_ENV || 'local';
  console.log('environment', environment);
  const toggles = environmentToggles[environment];
  console.log('toggles', toggles);
  return toggles;
};

export default getToggles();
