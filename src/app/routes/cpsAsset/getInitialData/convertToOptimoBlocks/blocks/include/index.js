// this defaults all VJ and IDT2 includes to the specified urls for now
const includeUrls = {
  include: 'https://simorgh-include-test.s3-eu-west-1.amazonaws.com/vj.html',
  idt2: 'https://simorgh-include-test.s3-eu-west-1.amazonaws.com/idt2.html',
};

const convertInclude = ({ href, ...rest }) => {
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
      // `includeUrls[type]` here should be replaced with `href` once mozart routes have been created. /*TODO: Create issue for this */
      href: includeUrls[type],
      ...rest,
    },
  };
};

export default convertInclude;
