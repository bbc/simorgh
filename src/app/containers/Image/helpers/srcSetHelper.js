const createSrcset = (originCode, locator) => {
  const resolutions = [240, 320, 480, 624, 800];
  if (originCode === 'pips') {
    return null;
  }
  const urls = resolutions.map(
    resolution =>
      `https://ichef.bbci.co.uk/news/${resolution}/${originCode}/${locator} ${resolution}w`,
  );

  return urls.join(', ');
};

export default createSrcset;
