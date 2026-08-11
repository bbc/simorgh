import { use } from 'react';
import { AccountContext } from '#contexts/AccountContext';
import type { SaveArticlePageData } from '#app/lib/utilities/extractSaveArticleProps';
import SaveArticleButtonAuthenticated from './SaveArticleButtonAuthenticated/lazy';
import SaveArticleButtonGuest from './SaveArticleButtonGuest';
import SaveArticleButtonGuestWithPreview from './SaveArticleButtonGuestWithPreview';
import styles from './index.styles';

export interface SaveArticleButtonProps {
  saveArticlePageData: SaveArticlePageData;
  enableGuestPreview?: boolean;
}

const SAVE_ARTICLE_BUTTON_ID = 'save-article-button';

const SaveArticleButton = ({
  saveArticlePageData,
  enableGuestPreview = false,
}: SaveArticleButtonProps) => {
  const { isPersonalizationAvailable, isPersonalizationEnabled } =
    use(AccountContext);

  if (!isPersonalizationAvailable) return null;

  const GuestButton = enableGuestPreview
    ? SaveArticleButtonGuestWithPreview
    : SaveArticleButtonGuest;

  return (
    <>
      <noscript>
        <style>{`#${SAVE_ARTICLE_BUTTON_ID} { display: none; }`}</style>
      </noscript>
      <div css={styles.buttonWrapper} id={SAVE_ARTICLE_BUTTON_ID}>
        {isPersonalizationEnabled ? (
          <SaveArticleButtonAuthenticated
            saveArticlePageData={saveArticlePageData}
          />
        ) : (
          <GuestButton saveArticlePageData={saveArticlePageData} />
        )}
      </div>
    </>
  );
};

export default SaveArticleButton;
