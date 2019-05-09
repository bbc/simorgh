const createSrcset = (originCode, locator) => {
  let imgSet = '';
  const resolutions = [240, 320, 480, 624, 800];
  if (originCode !== 'pips') {
    const overridableOriginCode = originCode || 'cpsdevpb';

    const urls = resolutions.map(
      resolution =>
        `https://ichef.bbci.co.uk/news/${resolution}/${overridableOriginCode}/${locator} ${resolution}w`,
    );

    imgSet = urls.join(', ');
  } else {
    imgSet = null;
  }

  return imgSet;
};

export default createSrcset;
