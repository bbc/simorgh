const VALID_DOMAINS = [
  '/',
  'localhost',
  'www.bbc.com',
  'bbc.com',
  'www.bbcrussian.com',
  'bbcrussian.com',
];

const isValidHref = (href: string) => {
  const url = new URL(href, 'http://localhost');

  return (
    VALID_DOMAINS.includes(url.hostname) &&
    !href.startsWith('#') &&
    !href.includes('.lite')
  );
};

export default (html: string) => {
  let modifiedHtml = html;

  const anchorTags = modifiedHtml.match(/<a[^>]*>/g) || [];

  anchorTags.forEach(tag => {
    const href = tag?.match(/href="([^"]*)"/)?.[1];
    if (href && isValidHref(href)) {
      modifiedHtml = modifiedHtml.replace(
        tag,
        tag.replace(href, `${href}.lite`),
      );
    }
  });

  return modifiedHtml;
};
