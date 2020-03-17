import 'isomorphic-fetch';
import webLogger from '#lib/logger.web';

const logger = webLogger();

// this defaults all VJ and IDT2 includes to the specified urls for now
// should be removed once mozart routes have been created
const includeUrls = {
  include: 'https://simorgh-include-test.s3-eu-west-1.amazonaws.com/vj.html',
  idt2: 'https://simorgh-include-test.s3-eu-west-1.amazonaws.com/idt2.html',
};

const encodeHTML = str =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const fetchMarkup = async url => {
  try {
    const res = await fetch(url);
    if (res.status !== 200) {
      throw new Error('Failed to fetch');
    } else {
      const html = await res.text();
      return encodeHTML(html);
    }
  } catch (e) {
    logger.error(`HTTP Error: "${e}"`);
    return null;
  }
};

const convertInclude = async ({ href, url, ...rest }) => {
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
      // `url || includeUrls[type]` here should be replaced with `href` once mozart routes have been created. /*TODO: Create issue for this */
      href: url || includeUrls[type],
      html: await fetchMarkup(includeUrls[type]),
      ...rest,
    },
  };
};

export default convertInclude;
