export default (url, isCompressed) => {
  const getSize = `curl -s '${url}' ${isCompressed ? '' : '| gzip'} | wc -c`;

  return cy
    .exec(getSize)
    .then(({ stderr }) => {
      if (stderr) {
        throw new Error(stderr);
      }
    })
    .then(({ stdout: size }) => {
      return Number.isNaN(size) ? 0 : parseFloat(size) / 1024;
    });
};
