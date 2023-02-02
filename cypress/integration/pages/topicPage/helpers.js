/* eslint-disable import/prefer-default-export */

export const getTopicPageUrl = currentPath => {
  // Temporarily use bbc.com to construct the url
  const url = new URL(`https://www.bbc.com${currentPath}`);
  const params = new URLSearchParams(url.search);

  /**
   * Check whether the URL has the renderer_env override already
   * If so, do nothing
   * Otherwise, append renderer_env=live to the url to ensure that the test accesses the correct page
   */
  if (!params.get('renderer_env')) {
    params.append('renderer_env', 'live');
  }
  params.append('page', 1);

  return `${url.pathname}?${params.toString()}`;
};
