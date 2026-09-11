import { Services, Variants } from '#app/models/types/global';

const PUBLIC_SERVICES = ['news', 'cymrufyw', 'naidheachdan'];

type GetTopicPageUrlProps = {
  service: Services;
  topicId: string;
  variant?: Variants | null;
  topicsPath?: string;
  absolute?: boolean;
};

const getTopicPageUrl = ({
  service,
  topicId,
  variant,
  topicsPath = 'topics',
  absolute = false,
}: GetTopicPageUrlProps) => {
  const path = `/${service}/${topicsPath}/${topicId}${variant ? `/${variant}` : ''}`;

  if (!absolute) return path;

  const hostname = `https://www.bbc.${PUBLIC_SERVICES.includes(service) ? 'co.uk' : 'com'}`;

  return `${hostname}${path}`;
};

export default getTopicPageUrl;
