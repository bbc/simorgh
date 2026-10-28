import { MouseEvent } from 'react';
import Link from '#app/components/Footer/Link';
import { TooltipContent } from '#app/components/ActionTooltip';
import { Translations } from '#app/models/types/translations';

type TopicTooltipTranslations = NonNullable<Translations['followTopicTooltip']>;

const getTopicTooltipContent = (
  translations: TopicTooltipTranslations,
  topicName: string,
  onMyNewsLinkClick?: (event: MouseEvent<HTMLAnchorElement>) => void,
): TooltipContent => {
  const { success, error, removed, myNewsLinkText, myNewsUrl } = translations;
  const myNewsLink = (
    <Link
      href={myNewsUrl}
      text={myNewsLinkText}
      inline
      onClick={onMyNewsLinkClick}
    />
  );
  const interpolateTopicName = (text: string) =>
    text.replace('{Topic Name}', topicName);

  return {
    success: {
      title: interpolateTopicName(success.title),
      body: (
        <>
          {success.bodyBefore} {myNewsLink} {success.bodyAfter}
        </>
      ),
    },
    error: {
      title: error.title,
      body: error.body,
    },
    removed: {
      title: interpolateTopicName(removed.title),
      body: (
        <>
          {removed.bodyBefore} {myNewsLink} {removed.bodyAfter}
        </>
      ),
    },
  };
};

export default getTopicTooltipContent;
