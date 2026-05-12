import useUASButton, { UASAction } from '#app/hooks/useUASButton';
import { use, useContext, useMemo } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import parseRoute from '#app/routes/utils/parseRoute';
import { Article } from '#app/models/types/optimo';
import useClickTracker from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import SaveButton from '../SaveButton';
import styles from './index.styles';

export interface SaveArticleButtonProps {
  articleTitle: string;
  articlePageData?: Article;
}

const SaveArticleButton = ({
  articleTitle,
  articlePageData,
}: SaveArticleButtonProps) => {
  const { pathname } = use(RequestContext);
  const { translations } = useContext(ServiceContext);
  const { saveArticleButton } = translations || {};
  const { assetId: articleId } = parseRoute(pathname);
  const { showButton, isSaved, isLoading, error, handleSaveAction } =
    useUASButton({
      articleId,
      articleTitle,
      articlePageData,
    });

  const clickComponentName = useMemo(
    () =>
      `save-article-button-click-${
        isSaved ? UASAction.REMOVE : UASAction.SAVE
      }`,
    [isSaved],
  );

  const viewTracker = useViewTracker({
    componentName: 'save-article-button-view',
  });

  const { onClick: onClickTrack } = useClickTracker({
    componentName: clickComponentName,
    itemTracker: {
      resourceId: articleId,
    },
  });

  if (!showButton) return null;

  if (!saveArticleButton) return null;

  if (error) {
    // eslint-disable-next-line no-console
    console.log('Error fetching saved status for article:', {
      articleId,
      error,
    });
  }

  const buttonLabel = isSaved
    ? saveArticleButton.saved
    : saveArticleButton.save;

  const buttonText = isLoading ? saveArticleButton.saving : buttonLabel;

  const handleClick = (event?: React.MouseEvent) => {
    onClickTrack?.(event);
    handleSaveAction(isSaved ? UASAction.REMOVE : UASAction.SAVE);
  };

  return (
    <div css={styles.buttonWrapper} {...viewTracker}>
      <SaveButton
        onClick={handleClick}
        isLoading={isLoading}
        isSaved={isSaved}
        disabled={isLoading}
        buttonText={buttonText}
        removeText={saveArticleButton.remove}
      />
    </div>
  );
};

export default SaveArticleButton;
