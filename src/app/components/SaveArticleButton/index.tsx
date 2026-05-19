import useUASButton, { UASAction } from '#app/hooks/useUASButton';
import { use, useContext } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import parseRoute from '#app/routes/utils/parseRoute';
import type { Article } from '#app/models/types/optimo';
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

  if (!showButton) return null;

  if (!saveArticleButton) return null;

  if (error) {
  }

  const buttonLabel = isSaved
    ? saveArticleButton.saved
    : saveArticleButton.save;

  const buttonText = isLoading ? saveArticleButton.saving : buttonLabel;

  const handleClick = () => {
    handleSaveAction(isSaved ? UASAction.REMOVE : UASAction.SAVE);
  };

  return (
    <div css={styles.buttonWrapper}>
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
