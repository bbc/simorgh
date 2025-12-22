import { Variants } from '#app/models/types/global';

/**
 * Returns the canonical topic page URL for a given topic ID, service, and variant.
 * @param topicId - The topic ID (e.g. 'c404v061z85t')
 * @param service - The BBC service (e.g. 'pidgin')
 * @param variant - Optional variant (e.g. 'simp')
 * @param topicsPath - The path segment for topics (e.g. 'topics', 'pynciau')
 * @returns The full topic page URL
 */
export const getTopicPageUrl = (
  topicId: string,
  service: string,
  variant?: Variants | null,
  topicsPath = 'topics',
) => {
  const isPublicService = ['news', 'cymrufyw', 'naidheachdan'];
  const hostname = `https://www.bbc.${isPublicService.includes(service) ? 'co.uk' : 'com'}`;
  return `${hostname}/${service}/${topicsPath}/${topicId}${variant ? `/${variant}` : ''}`;
};

export default getTopicPageUrl;
