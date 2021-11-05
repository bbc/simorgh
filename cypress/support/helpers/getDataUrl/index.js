import Url from 'url-parse';

export default path => {
  /**
   *  Appends .json to the pathname, before appending query string values
   *
   * */

  const urlFromPath = new Url(path);
  urlFromPath.set('pathname', `${urlFromPath.pathname}.json`);

  return urlFromPath.href;
};
