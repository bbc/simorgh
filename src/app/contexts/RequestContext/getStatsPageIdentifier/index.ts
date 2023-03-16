import { PageTypes, Services } from '#app/models/types/global';
import { ARTICLE_PAGE, FRONT_PAGE } from '../../../routes/utils/pageTypes';

type Props = {
  pageType: PageTypes;
  service: Services;
  id?: string | null;
};

const getStatsPageIdentifier = ({ pageType, service, id }: Props) => {
  if (pageType === ARTICLE_PAGE) {
    return `${service}.articles.${id}.page`;
  }
  if (pageType === FRONT_PAGE) {
    return `${service}.page`; // front pages
  }
  return null;
};

export default getStatsPageIdentifier;
