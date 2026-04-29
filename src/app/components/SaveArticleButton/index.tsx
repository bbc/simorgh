import useUASButton, { UASAction } from '#app/hooks/useUASButton';
import {
  getAssetIdFromCanonicalUrl,
  getArticleId,
} from '#app/lib/utilities/parseAssetData';
import { Article } from '#app/models/types/optimo';
import { parseArticleID } from '#app/lib/uasApi/uasUtility';
import { useContext } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
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
  const getArticleIdFromData = () => {
    if (articlePageData?.metadata?.locators?.canonicalUrl) {
      return getAssetIdFromCanonicalUrl(
        articlePageData.metadata.locators.canonicalUrl,
      );
    }
    if (articlePageData) {
      return parseArticleID(getArticleId(articlePageData));
    }
    return '';
  };

  const articleId = getArticleIdFromData();

  const { showButton, isSaved, isLoading, error, handleSaveAction } =
    useUASButton({
      articleId: articleId || '',
      articleTitle,
      articlePageData,
    });

  const { translations } = useContext(ServiceContext);
  const { saveArticleButton } = translations || {};

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
