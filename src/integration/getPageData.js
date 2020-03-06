const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const pathnames = require('./pageUrls');

const writeJson = (pathname, filePath, json) => {
  fs.writeFile(filePath, JSON.stringify(json), 'utf8', error => {
    if (error) {
      // eslint-disable-next-line no-console
      console.info('An Error Occurred -- ', error);
    } else {
      console.info(`Successfully downloaded ${pathname}`);
      // eslint-disable-next-line no-console
    }
  });
};

const getJsonEndpoint = pathname => `${pathname}.json`;
const getDirPath = pathname => {
  const dirPath = pathname.replace('https://www.bbc.com', '').split('/');
  dirPath.splice(-1);
  return path.join(__dirname, 'pageData/', dirPath.join('/'));
};
const getJsonFilename = pathname => {
  const pathnameParts = pathname.split('/');
  return pathnameParts[pathnameParts.length - 1];
};
const getJsonFilePath = (dirPath, filename) => `${dirPath}/${filename}`;

const init = _pathname => {
  const pathname = getJsonEndpoint(_pathname);
  fetch(pathname)
    .then(res => res.json())
    .then(json => {
      const dirPath = getDirPath(pathname);
      const jsonFilename = getJsonFilename(pathname);
      const jsonFilePath = getJsonFilePath(dirPath, jsonFilename);

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      writeJson(pathname, jsonFilePath, json);
    })
    .catch(console.log);
};

Object.values(pathnames).forEach(init);
