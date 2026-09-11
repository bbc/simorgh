import { MouseEvent } from 'react';
import Link from '#app/components/Footer/Link';
import { TooltipContent } from '#app/components/ActionTooltip';
import { Translations } from '#app/models/types/translations';

type ArticleTooltipTranslations = NonNullable<Translations['actionTooltip']>;

const getArticleTooltipContent = (
  {
    success,
    error,
    removed,
    myNewsLinkText,
    myNewsUrl,
  }: ArticleTooltipTranslations,
  onMyNewsLinkClick?: (event: MouseEvent<HTMLAnchorElement>) => void,
): TooltipContent => {
  const myNewsLink = (
    <Link
      href={myNewsUrl}
      text={myNewsLinkText}
      inline
      onClick={onMyNewsLinkClick}
    />
  );

  return {
    success: {
      title: success.title,
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
      title: removed.title,
      body: (
        <>
          {removed.bodyBefore} {myNewsLink} {removed.bodyAfter}
        </>
      ),
    },
  };
};

export default getArticleTooltipContent;
