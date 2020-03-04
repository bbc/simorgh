export default pathname => {
  const [, , errorPage] = pathname.split('/');
  const errorCode = Number(errorPage);

  return Promise.resolve({ status: 200, errorCode });
};
