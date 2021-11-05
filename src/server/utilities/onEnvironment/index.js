const onEnvironment = (env, params) => wrappedFunction => {
  const shouldCallFunction = env.includes(process.env.SIMORGH_APP_ENV);

  if (!shouldCallFunction) return;

  wrappedFunction(params);
};

export default onEnvironment;
