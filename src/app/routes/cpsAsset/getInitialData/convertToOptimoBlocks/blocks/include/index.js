import 'isomorphic-fetch';
import nodeLogger from '#lib/logger.node';

const logger = nodeLogger(__filename);

// this defaults all VJ and IDT2 includes to the specified urls for now
// should be removed once mozart routes have been created
const includeUrls = {
  vj: 'https://simorgh-include-test.s3-eu-west-1.amazonaws.com/vj.html',
  idt2: 'https://simorgh-include-test.s3-eu-west-1.amazonaws.com/idt2.html',
  idt1: 'https://simorgh-include-test.s3-eu-west-1.amazonaws.com/idt1.html',
};

const fetchMarkup = async url => {
  try {
    const res = await fetch(url, { timeout: 3000 });
    if (res.status !== 200) {
      throw new Error('Failed to fetch');
    } else {
      const html = await res.text();
      return html;
    }
  } catch (e) {
    logger.error(
      JSON.stringify(
        {
          event: 'http_fetch_error',
          message: e,
        },
        null,
        2,
      ),
    );
    return null;
  }
};

const convertInclude = async ({ href, type, ...rest }) => {
  const supportedTypes = {
    indepthtoolkit: 'idt1',
    idt2: 'idt2',
    include: 'vj',
  };

  // This determines if the href has a leading '/'
  const hrefTypePostion = () => (href.indexOf('/') === 0 ? 1 : 0);

  // This checks if the supportedType is in the correct position of the href
  const hrefIsSupported = () => supportedType =>
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
      href,
      // `includeUrls[type]` here should be replaced with `href` once mozart routes have been created. /*TODO: Create issue for this */
      html: await fetchMarkup(includeUrls[includeType]),
      type: includeType,
      ...rest,
    },
  };
};

export default convertInclude;
