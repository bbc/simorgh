import Link from '#app/components/Footer/Link';
import { TooltipContent } from '#app/components/ActionTooltip';

interface ArticleTooltipTranslations {
  success: {
    titleBefore: string;
    titleAfter: string;
  };
  error: {
    title: string;
    body: string;
  };
  removed: {
    titleBefore: string;
    titleAfter: string;
  };
  myNewsLinkText: string;
  myNewsUrl: string;
}

const getArticleTooltipContent = (
  actionTooltip: ArticleTooltipTranslations,
): TooltipContent => {
  const myNewsLink = (
    <Link
      href={actionTooltip.myNewsUrl}
      text={actionTooltip.myNewsLinkText}
      inline
    />
  );

  return {
    success: {
      title: (
        <>
          {actionTooltip.success.titleBefore} {myNewsLink}{' '}
          {actionTooltip.success.titleAfter}
        </>
      ),
    },
    error: {
      title: actionTooltip.error.title,
      body: actionTooltip.error.body,
    },
    removed: {
      title: (
        <>
          {actionTooltip.removed.titleBefore} {myNewsLink}{' '}
          {actionTooltip.removed.titleAfter}
        </>
      ),
    },
  };
};

export default getArticleTooltipContent;
