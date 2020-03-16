const convertInclude = ({ href, url, ...rest }) => {
  const supportedTypes = {
    idt2: 'idt2',
    include: 'include',
  };
  const type = href.split('/')[1];

  if (!supportedTypes[type]) {
    return null;
  }
  return {
    type,
    model: {
      // `url` here should be replaced with `href` once mozart routes have been created. /*TODO: Create issue for this */
      href: url,
      ...rest,
    },
  };
};

export default convertInclude;
