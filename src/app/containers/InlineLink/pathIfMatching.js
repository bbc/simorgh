import pathToRegexp from 'path-to-regexp';

const pathIfMatching = (regexString, url) => {
  const regexp = pathToRegexp(regexString, [], {
    start: false,
    end: false,
  });

  const regexResultArray = regexp.exec(url);

  if (!regexResultArray) {
    return null;
  }

  const path = regexResultArray[0];
  return path;
};

export default pathIfMatching;
