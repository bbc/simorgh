import { use } from 'react';
import { AccountContext } from '#contexts/AccountContext';
import { Article } from '#app/models/types/optimo';
import SaveArticleButtonAuthenticated from './SaveArticleButtonAuthenticated/lazy';
import SaveArticleButtonGuest from './SaveArticleButtonGuest';
import styles from './index.styles';

export interface SaveArticleButtonProps {
  articlePageData?: Article;
}

const SaveArticleButton = (props: SaveArticleButtonProps) => {
  const { isPersonalizationAvailable, isPersonalizationEnabled } =
    use(AccountContext);

  if (!isPersonalizationAvailable) return null;

  return (
    <>
      <noscript>
        <style>{`#save-article-button { display: none; }`}</style>
      </noscript>
      <div css={styles.buttonWrapper} id="save-article-button">
        {isPersonalizationEnabled ? (
          <SaveArticleButtonAuthenticated {...props} />
        ) : (
          <SaveArticleButtonGuest />
        )}
      </div>
    </>
  );
};

export default SaveArticleButton;
