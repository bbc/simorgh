import getPageSizeInKB from './getPageSizeInKB';
import roundTo2Decimals from './roundTo2Decimals';

export default requests => {
  let totalSize = 0;
  const requestSizes = [];

  // eslint-disable-next-line cypress/unsafe-to-chain-command
  return cy
    .wrap(requests)
    .each(({ url, isCompressed, contentLength }) => {
      if (contentLength) {
        requestSizes.push({ url, size: contentLength });
        totalSize += contentLength;
      } else {
        getPageSizeInKB(url, isCompressed).then(size => {
          requestSizes.push({ url, size });
          totalSize += size;
        });
      }
    })
    .then(() => {
      return { totalSize: roundTo2Decimals(totalSize), requestSizes };
    });
};
