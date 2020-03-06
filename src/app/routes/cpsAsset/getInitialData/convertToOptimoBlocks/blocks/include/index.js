import 'isomorphic-fetch';

const fetchMarkup = async url => {
  try {
    const html = await fetch(url, { mode: 'no-cors' });
    return await html.text();
  } catch (e) {
    console.error(`Error fetching include ${url}: ${e}`);
  }
};

const convertInclude = async ({ tile, href, platform, url }) => {
  return {
    type: 'include',
    model: {
      type: platform,
      href,
      tile,
      html: url ? await fetchMarkup(url) : null,
    },
  };
};

export default convertInclude;
