export type EnvironmentConfigType = {
  baseUrl: string;
  dataUrl: string;
  assetUrl: string;
  assetOrigin: string;
  atiUrl: string;
  reverbAtiUrl: string;
  avEmbedBaseUrlCanonical: string;
  avEmbedBaseUrlAmp: string;
  standaloneErrorPages: boolean;
  alwaysCheckForFallback: boolean;
  togglesUrl: string;
};

export type Environment = 'live' | 'test' | 'local';

type CypressEnvironmentReader = {
  env: (name: string) => string | boolean | undefined;
};

const config = {
  live: {
    baseUrl: 'https://www.bbc.com',
    dataUrl: 'https://www.bbc.com',
    assetUrl: 'https://static.files.bbci.co.uk/ws/simorgh-assets/public',
    assetOrigin: 'https://news.files.bbci.co.uk',
    atiUrl: 'https://a1.api.bbc.co.uk/hit.xiti?',
    reverbAtiUrl: 'https://a1.api.bbc.co.uk/hit.xiti?',
    avEmbedBaseUrlCanonical: '',
    avEmbedBaseUrlAmp: 'https://web-cdn.api.bbci.co.uk',
    standaloneErrorPages: false,
    alwaysCheckForFallback: true,
    togglesUrl: 'https://config.api.bbci.co.uk/',
  },
  test: {
    baseUrl: 'https://www.test.bbc.com',
    dataUrl: 'https://www.test.bbc.com',
    assetUrl: 'https://static.test.files.bbci.co.uk/ws/simorgh-assets/public',
    assetOrigin: 'https://news.test.files.bbci.co.uk',
    atiUrl: 'https://logws1363.ati-host.net/hit.xiti?',
    reverbAtiUrl: 'https://logw363.ati-host.net/hit.xiti?',
    avEmbedBaseUrlCanonical: '',
    avEmbedBaseUrlAmp: 'https://web-cdn.test.api.bbci.co.uk',
    standaloneErrorPages: false,
    alwaysCheckForFallback: true,
    togglesUrl: 'https://config.test.api.bbci.co.uk/',
  },
  local: {
    baseUrl: 'http://localhost.bbc.com:7080',
    dataUrl: 'http://localhost:7080',
    assetUrl: 'http://localhost:7080',
    assetOrigin: 'http://localhost:7080',
    atiUrl: 'https://logws1363.ati-host.net/hit.xiti?',
    reverbAtiUrl: 'https://logw363.ati-host.net/hit.xiti?',
    avEmbedBaseUrlCanonical: 'https://www.test.bbc.com',
    avEmbedBaseUrlAmp: 'https://web-cdn.test.api.bbci.co.uk',
    standaloneErrorPages: true,
    alwaysCheckForFallback: false,
    togglesUrl: 'https://config.test.api.bbci.co.uk/',
  },
};

const geoLocate = (conf: EnvironmentConfigType, isUk = false) => {
  if (!isUk) return conf;

  return {
    ...conf,
    baseUrl: conf.baseUrl.replace('.com', '.co.uk'),
    dataUrl: conf.dataUrl.replace('.com', '.co.uk'),
  };
};

const environmentConfig = config satisfies Record<
  Environment,
  EnvironmentConfigType
>;

const isEnvironment = (
  value: string | boolean | undefined,
): value is Environment =>
  value === 'live' || value === 'test' || value === 'local';

const getCypressEnvironmentReader = () => {
  const { Cypress } = globalThis as typeof globalThis & {
    Cypress?: CypressEnvironmentReader;
  };

  return Cypress;
};

export const getEnvConfig = (env: Environment, uk = false) =>
  geoLocate(environmentConfig[env], uk);

const getCurrentEnvConfig = () => {
  const cypressEnvironmentReader = getCypressEnvironmentReader();
  const currentEnvironment = cypressEnvironmentReader?.env('APP_ENV');

  if (!isEnvironment(currentEnvironment)) {
    return getEnvConfig('local');
  }

  return getEnvConfig(
    currentEnvironment,
    Boolean(cypressEnvironmentReader?.env('UK')),
  );
};

export default getCurrentEnvConfig();
