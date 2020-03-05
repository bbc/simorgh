import 'isomorphic-fetch';
import webLogger from '#lib/logger.web';

const logger = webLogger();

const fetchMarkup = async url =>
  fetch(url, { mode: 'no-cors' })
    .then(html => {
      if (html.status !== 200) return null;

      return html.text().then(text => {
        return text;
      });
    })
    .catch(e => logger.error(`HTTP Error: "${e}"`));

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
