import { getEnvConfig } from '../getEnvConfig';

/*
The pattern below:
matches
  https://ichef.test.bbci.co.uk/news/660/cpsprodpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg
  https://ichef.bbci.co.uk/news/660/cpsdevpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg
  https://ichef.test.bbci.co.uk/ace/ws/660/cpsprodpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg
  https://ichef.bbci.co.uk/ace/standard/660/cpsprodpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png
  https://ichef.test.bbci.co.uk/ace/ws/660/amz/worldservice/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg
  https://ichef.bbci.co.uk/ace/standard/660/amz/worldservice/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png

does not match
  https://ichef.test.bbci.co.uk/news/660/amz/worldservice/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg
  https://ichef.bbci.co.uk/news/660/amz/worldservice/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.png
*/

const webpSupportedPatterns = [
  /^https:\/\/ichef(?:\.test)?\.bbci\.co\.uk\/(?:news|ace\/(?:standard|ws))\/.+(?:\.jpg|\.png|\.gif)$/,
  /(?:\/ace\/(?:standard|ws)\/.+\/(?:amz\/worldservice\/)?|\/news\/(?!.+\/amz\/worldservice\/)).*/,
];

const isSupportedWebpUrl = url =>
  webpSupportedPatterns.every(pattern => pattern.test(url));
const buildPlaceholderSrc = (src, resolution) => {
  const imageSrc =
    src || 'https://ichef.bbci.co.uk/images/ic/640xn/p0b36kgx.png';
  if (imageSrc.includes('urn:') || imageSrc.includes('localhost:'))
    return imageSrc;
  const urlParts = imageSrc.replace(/https?:\/\//g, '').split('/');
  const [domain, mediaType, imgService, ...remainingUrlParts] = urlParts;
  const remainingUrlPartsWithoutResolution = remainingUrlParts.slice(1);
  const newResolution = `${resolution}xn`;
  const newUrl = [
    domain,
    mediaType,
    imgService,
    newResolution,
    ...remainingUrlPartsWithoutResolution,
  ];
  return `https://${newUrl.join('/')}.webp`;
};

const buildIChefURL = ({
  originCode,
  locator,
  resolution,
  ichefSubdomain = 'ace/ws',
}) => {
  if (originCode === 'mpv' || originCode === 'pips') {
    return buildPlaceholderSrc(locator, resolution);
  }

  const url = [
    getEnvConfig().SIMORGH_ICHEF_BASE_URL || 'https://ichef.bbci.co.uk',
    ichefSubdomain,
    resolution,
    originCode,
    locator,
  ]
    .filter(Boolean)
    .join('/');

  return isSupportedWebpUrl(url) ? `${url}.webp` : url;
};

export default buildIChefURL;
