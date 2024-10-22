import Url from 'url-parse';

export default path => {
  /**
   *  Appends .lite to the pathname, before appending query string values
   *
   * */

  const urlFromPath = new Url(path);

  if (!urlFromPath.pathname.includes('.lite')) {
    urlFromPath.set('pathname', `${urlFromPath.pathname}.lite`);
  }

  return urlFromPath.href;
};
