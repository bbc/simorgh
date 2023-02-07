/* eslint-disable import/prefer-default-export */
import envConfig from '../../../support/config/envs';
import getAppEnv from '../../../support/helpers/getAppEnv';

export const getTopicPagePath = currentPath => {
  const url = new URL(`${envConfig.baseUrl}${currentPath}`);
  const params = new URLSearchParams(url.search);

  /**
   * Check whether the URL has the renderer_env override already
   * If so, do nothing
   * Otherwise, append renderer_env=live to the url when running on test to ensure that the correct topic page is accessed
   */
  if (!params.get('renderer_env') && getAppEnv() === 'test') {
    params.append('renderer_env', 'live');
  }

  params.append('page', 1);

  return `${url.pathname}?${params.toString()}`;
};
