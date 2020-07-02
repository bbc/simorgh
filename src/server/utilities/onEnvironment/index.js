const onEnvironment = (env, params) => wrappedFunction => {
  const shouldCallFunction = process.env.SIMORGH_APP_ENV === env;

  if (!shouldCallFunction) return;

  wrappedFunction(params);
};

export default onEnvironment;
