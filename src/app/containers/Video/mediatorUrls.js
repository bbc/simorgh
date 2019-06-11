const mediatorURL = env => {
  let url = 'open.bbc.co.uk';

  if (env === 'test' || env === 'local') {
    url = 'open.test.bbc.co.uk';
  }
  return url;
};

export default mediatorURL;
