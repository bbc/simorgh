import { MostReadData } from '#app/components/MostRead/types';
import getOriginContext from '#app/contexts/RequestContext/getOriginContext';
import isLive from '../isLive';

type MostReadDataItem = MostReadData['items'][number];

type MostReadOfflineData = Pick<
  MostReadData,
  'generated' | 'lastRecordTimeStamp' | 'firstRecordTimeStamp'
> & {
  items: Pick<MostReadDataItem, 'href' | 'title' | 'timestamp'>[];
};

const buildArticleUrl = (href: string): string => {
  const { origin } = getOriginContext(null);
  const url = new URL(href);

  // TODO: To be confirmed the exact query params
  url.searchParams.set('mode', 'offline');

  if (!isLive()) {
    url.host = new URL(origin).host;
    url.protocol = new URL(origin).protocol;
    url.searchParams.set('renderer_env', 'live');
  }

  return url.toString();
};

const getMostReadOfflineData = (data: MostReadData): MostReadOfflineData => ({
  generated: data.generated,
  lastRecordTimeStamp: data.lastRecordTimeStamp,
  firstRecordTimeStamp: data.firstRecordTimeStamp,
  items: data.items.map(({ href, title, timestamp }) => ({
    href: buildArticleUrl(href),
    title,
    timestamp,
  })),
});

export default getMostReadOfflineData;
