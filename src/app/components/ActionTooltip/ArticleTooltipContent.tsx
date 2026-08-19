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
      title: (
        <>
          {success.titleBefore} {myNewsLink} {success.titleAfter}
        </>
      ),
    },
    error: {
      title: error.title,
      body: error.body,
    },
    removed: {
      title: (
        <>
          {removed.titleBefore} {myNewsLink} {removed.titleAfter}
        </>
      ),
    },
  };
};

export default getArticleTooltipContent;
