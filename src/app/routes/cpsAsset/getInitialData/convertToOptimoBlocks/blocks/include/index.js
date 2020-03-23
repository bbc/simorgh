const convertInclude = ({ href, url, type, ...rest }) => {
  const supportedTypes = {
    indepthtoolkit: 'idt1',
    idt2: 'idt2',
    include: 'vj',
  };

  // This determines if the href has a leading '/'
  const hrefTypePostion = () => (href.indexOf('/') === 0 ? 1 : 0);

  // This checks if the supportedType is in the correct position of the href
  const hrefIsSupported = () => (supportedType) =>
    href && href.startsWith(supportedType, hrefTypePostion());

  // This extracts the type from the href
  const typeExtraction = Object.keys(supportedTypes).find(
    hrefIsSupported(href),
  );

  // This determines if the type is supported and returns the include type name
  const includeType = supportedTypes[typeExtraction];

  if (!includeType) {
    return null;
  }

  return {
    type,
    model: {
      // `url` here should be replaced with `href` once mozart routes have been created. /*TODO: Create issue for this */
      href: url,
      ...rest,
      type: includeType,
    },
  };
};

export default convertInclude;
