const createSrcset = (originCode, locator, originalImageWidth) => {
  const resolutions = [240, 320, 480, 624, 800];
  const ichefUrl = 'https://ichef.bbci.co.uk/news';
  if (originCode === 'pips') {
    return null;
  }

  const requiredResolutions = resolutions.filter(
    resolution => resolution <= originalImageWidth,
  );

  if (
    originalImageWidth < resolutions[resolutions.length - 1] &&
    !requiredResolutions.includes(originalImageWidth)
  ) {
    requiredResolutions.push(originalImageWidth);
  }

  const urls = requiredResolutions.map(
    resolution =>
      `${ichefUrl}/${resolution}/${originCode}/${locator} ${resolution}w`,
  );

  return urls.join(', ');
};

export default createSrcset;
