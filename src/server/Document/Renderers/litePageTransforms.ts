const VALID_DOMAINS = [
  '/',
  'localhost',
  'www.bbc.com',
  'bbc.com',
  'www.bbcrussian.com',
  'bbcrussian.com',
];

const isValidDomain = (href: string) => {
  const url = new URL(href, 'http://localhost');
  return !href.startsWith('#') && VALID_DOMAINS.includes(url.hostname);
};

export default (html: string) => {
  let modifiedHtml = html;

  const anchorTags = modifiedHtml.match(/<a[^>]*>/g) || [];

  anchorTags.forEach(tag => {
    const href = tag?.match(/href="([^"]*)"/)?.[1];
    if (href && isValidDomain(href)) {
      modifiedHtml = modifiedHtml.replace(
        tag,
        tag.replace(href, `${href}.lite`),
      );
    }
  });

  return modifiedHtml;
};
