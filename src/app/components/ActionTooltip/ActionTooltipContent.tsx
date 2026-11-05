import { MouseEvent } from 'react';
import Link from '#app/components/Footer/Link';
import { TooltipContent } from '#app/components/ActionTooltip';
import { Translations } from '#app/models/types/translations';

export type ActionTooltipTranslations = NonNullable<
  Translations['actionTooltip']
>;

interface GetActionTooltipContentOptions {
  topicName?: string;
  onMyNewsLinkClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

const getActionTooltipContent = (
  {
    success,
    error,
    removed,
    myNewsLinkText,
    myNewsUrl,
  }: ActionTooltipTranslations,
  { topicName, onMyNewsLinkClick }: GetActionTooltipContentOptions = {},
): TooltipContent => {
  const myNewsLink = (
    <Link
      href={myNewsUrl}
      text={myNewsLinkText}
      inline
      onClick={onMyNewsLinkClick}
    />
  );
  const interpolateTopicName = (text: string) =>
    topicName ? text.replace('{Topic Name}', topicName) : text;

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

export default getActionTooltipContent;
