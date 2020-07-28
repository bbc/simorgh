import Url from 'url-parse';

export default path => {
  /**
   *  Appends .amp to the pathname, before appending query string values
   *
   * */

  const urlFromPath = new Url(path);

  if (!urlFromPath.pathname.includes('.amp')) {
    urlFromPath.set('pathname', `${urlFromPath.pathname}.amp`);
  }

  return urlFromPath.href;
};
