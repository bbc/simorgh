const getData = results => {
  let output = {};

  results.forEach(({ env, pageType, url, service }) => {
    output = {
      ...output,
      [service]: {
        ...(output[service] || {}),
        [pageType]: {
          ...((output[service] && output[service][pageType]) || {}),
          [env]: url,
        },
      },
    };
  });

  return output;
};

module.exports = getData;
