import { ServiceContext } from '#contexts/ServiceContext';
import SaveButton from '#app/components/SaveButton';
import { use, useState } from 'react';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import { RequestContext } from '#app/contexts/RequestContext';
import parseRoute from '#app/routes/utils/parseRoute';
import useClickTracker from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import useTemporarySavedArticles from '#app/hooks/useTemporarySavedArticles';
import SaveArticleConfirmation from './SaveArticleConfirmation';
import SaveButtonTooltip from './SaveButtonTooltip';

interface SaveArticleButtonGuestWithPreviewProps {
  saveArticlePageData?: {
    headline?: string | null;
    canonicalUrl?: string;
    promoImage?: string;
    promoImageAltText?: string;
  };
}

const SaveArticleButtonGuestWithPreview = ({
  saveArticlePageData,
}: SaveArticleButtonGuestWithPreviewProps) => {
  const { translations, service } = use(ServiceContext);
  const { pathname } = use(RequestContext);
  const { assetId: articleId } = parseRoute(pathname);
  const isHydrated = useHydrationDetection();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const { saveArticle, removeArticle, isArticleSaved } =
    useTemporarySavedArticles();

  const { saveArticleButton } = translations || {};
  const isSaved = isArticleSaved(articleId);

  let label = saveArticleButton?.loading;
  if (isHydrated) {
    label = isSaved ? saveArticleButton?.saved : saveArticleButton?.save;
  }

  const hoverLabel = isSaved ? saveArticleButton?.remove : undefined;

  const viewTracker = useViewTracker({
    componentName: 'save-article-button-guest-preview-view',
  });

  const { onClick: onClickTrack } = useClickTracker({
    componentName: 'save-article-button-guest-preview-click',
    itemTracker: {
      resourceId: articleId,
    },
  });

  if (!saveArticleButton) return null;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClickTrack?.(e);

    if (isSaved) {
      removeArticle(articleId);
    } else {
      const article = {
        id: articleId,
        title: saveArticlePageData?.headline || 'Untitled',
        link: pathname,
        imageUrl: saveArticlePageData?.promoImage || '',
        imageAlt: saveArticlePageData?.promoImageAltText || '',
        promoImage: saveArticlePageData?.promoImage,
        type: 'article',
        description: service,
      };
      saveArticle(article);
      setShowConfirmation(true);
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <SaveButton
        onClick={handleClick}
        visualLabel={label ?? ''}
        hoverVisualLabel={hoverLabel}
        accessibleLabel={label ?? ''}
        testId="save-article-btn-guest-preview"
        isLoading={!isHydrated}
        isSaved={isSaved}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        {...viewTracker}
      />
      {showTooltip && <SaveButtonTooltip isSaved={isSaved} />}
      {showConfirmation && (
        <SaveArticleConfirmation onClose={() => setShowConfirmation(false)} />
      )}
    </div>
  );
};

export default SaveArticleButtonGuestWithPreview;
