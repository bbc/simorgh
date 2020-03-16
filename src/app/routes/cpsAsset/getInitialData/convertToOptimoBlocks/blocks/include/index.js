const convertInclude = ({ href, url, type, ...rest }) => {
  const supportedTypes = {
    indepthtoolkit: 'idt1',
    idt2: 'idt2',
    include: 'vj',
  };
  const typeExtraction = href.split('/')[1];

  if (!supportedTypes[typeExtraction]) {
    return null;
  }

  const includeType = supportedTypes[typeExtraction];
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
