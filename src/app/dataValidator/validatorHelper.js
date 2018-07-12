module.exports = {
  log: message => {
    if (process.env.NODE_ENV !== 'test' && typeof jest === 'undefined') {
      console.log(message); // eslint-disable-line no-console
    }
  },
  throwError: errorMsg => {
    throw errorMsg;
  },
};
