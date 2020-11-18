import Url from 'url-parse';

const supportedTypes = {
  indepthtoolkit: 'idt1',
  idt2: 'idt2',
  include: 'vj',
  'news/special': 'vj',
  'market-data': 'vj',
  'smallprox/include': 'vj',
};

const hasAmpVersion = href => {
  // An amp-image query parameter on the include path indicates an AMP version of the include is available
  const hasAmpImageQueryString = new Url(href, true).query['amp-image'];
  return !!hasAmpImageQueryString;
};

const includeClassifier = ({ href, isAmpRequest }) => {
  // This determines if the href has a leading '/'
  const hrefTypePostion = () => (href.indexOf('/') === 0 ? 1 : 0);

  // This checks if the supportedType is in the correct position of the href
  const hrefIsSupported = supportedType =>
    href.startsWith(supportedType, hrefTypePostion());

  // This extracts the type from the href
  const typeExtraction = Object.keys(supportedTypes).find(supportedType =>
    hrefIsSupported(supportedType),
  );

  // This determines if the type is supported and returns the include type name
  const includeType = supportedTypes[typeExtraction];

  const platform = isAmpRequest ? 'amp' : 'canonical';
  const classification = includeType
    ? `${includeType}-${platform}`
    : 'not-supported';

  if (includeType === 'vj' && !isAmpRequest) {
    return { includeType, classification: 'vj-canonical' };
  }

  if (includeType === 'vj' && hasAmpVersion(href)) {
    return { includeType, classification: 'vj-supports-amp' };
  }

  if (includeType === 'vj' && !hasAmpVersion(href)) {
    return { includeType, classification: 'vj-amp-not-supported' };
  }

  return { includeType: includeType || null, classification };
};

export default includeClassifier;
