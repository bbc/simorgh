require('isomorphic-fetch');

const getService = path => path.slice(1).split('/')[0];

const isOnSimorgh = ({ url, env, pageType, path }) => {
  console.log(`calling ${url}`);
  return fetch(url)
    .then(response => {
      if (![200, 404].includes(response.status)) {
        throw new Error(`${url}, Got status ${response.status}`);
      }

      return response.text();
    })
    .then(text => {
      if (
        !text.includes('window.SIMORGH_DATA') &&
        !text.includes('<div id="root"><header role="banner">')
      ) {
        throw new Error(`${url}, could not find window.SIMORGH_DATA`);
      }

      return {
        isSimorgh: true,
        env,
        pageType,
        url,
        service: getService(path),
        path,
      };
    })
    .catch(() => {
      return false;
    });
};

module.exports = {
  getService,
  isOnSimorgh,
};
