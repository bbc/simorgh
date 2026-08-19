import { use } from 'react';
import { AccountContext } from '#contexts/AccountContext';
import type { SaveArticlePageData } from '#app/lib/utilities/extractSaveArticleProps';
import ErrorBoundary from '#app/components/ErrorBoundary';
import SaveArticleButtonAuthenticated from './SaveArticleButtonAuthenticated/lazy';
import SaveArticleButtonGuest from './SaveArticleButtonGuest';
import styles from './index.styles';

export interface SaveArticleButtonProps {
  saveArticlePageData: SaveArticlePageData;
}

const SAVE_ARTICLE_BUTTON_ID = 'save-article-button';

const SaveArticleButton = (props: SaveArticleButtonProps) => {
  const { isPersonalizationAvailable, isPersonalizationEnabled } =
    use(AccountContext);

  if (!isPersonalizationAvailable) return null;

  return (
    <ErrorBoundary componentName="SaveArticleButton">
      <noscript>
        <style>{`#${SAVE_ARTICLE_BUTTON_ID} { display: none; }`}</style>
      </noscript>
      <div css={styles.buttonWrapper} id={SAVE_ARTICLE_BUTTON_ID}>
        {isPersonalizationEnabled ? (
          // Falls back to hiding the widget rather than SaveArticleButtonGuest,
          // since its sign-in prompt would be misleading for an already-authenticated user.
          <SaveArticleButtonAuthenticated {...props} />
        ) : (
          <SaveArticleButtonGuest />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default SaveArticleButton;
