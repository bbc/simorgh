import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

const onEnvironment = (env, params) => wrappedFunction => {
  const shouldCallFunction = env.includes(getEnvConfig().SIMORGH_APP_ENV);

  if (!shouldCallFunction) return;

  wrappedFunction(params);
};

export default onEnvironment;
