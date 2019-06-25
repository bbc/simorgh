const mediatorURL = env =>
  env === 'test' || env === 'local' ? 'open.test.bbc.co.uk' : 'open.bbc.co.uk';

export default mediatorURL;
