import 'isomorphic-fetch';

const fetchMarkup = async url =>
  fetch(url, { mode: 'no-cors' })
    .then(html => {
      return html.text().then(text => {
        return text;
      });
    })
    .catch(e => console.error(`HTTP Error: "${e}"`));

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
