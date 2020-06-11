import { ampSupported } from './ampSrcBuilder';

const supportedTypes = {
  indepthtoolkit: 'idt1',
  idt2: 'idt2',
  include: 'vj',
  'news/special': 'vj',
  'market-data': 'vj',
  'smallprox/include': 'vj',
};

const includeClassifier = ({ href, pathname }) => {
  // This determines if the href has a leading '/'
  const hrefTypePostion = () => (href.indexOf('/') === 0 ? 1 : 0);

  // This checks if the supportedType is in the correct position of the href
  const hrefIsSupported = () => supportedType =>
    href.startsWith(supportedType, hrefTypePostion());

  // This extracts the type from the href
  const typeExtraction = Object.keys(supportedTypes).find(
    hrefIsSupported(href),
  );

  // This determines if the type is supported and returns the include type name
  const includeType = supportedTypes[typeExtraction];

  const pathnameIsAmp = pathname.endsWith('.amp');

  if (includeType === 'vj') {
    if (!pathnameIsAmp) {
      return 'vj-include-canonical';
    }

    if (ampSupported(href)) {
      return 'vj-include-supports-amp';
    }

    return 'vj-include-not-supporting-amp';
  }
  if (includeType) {
    return includeType;
  }
  return 'not-supported';
};

export default includeClassifier;
