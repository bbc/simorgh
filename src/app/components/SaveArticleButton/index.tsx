import { use } from 'react';

import { Article } from '#app/models/types/optimo';
import { AccountContext } from '#contexts/AccountContext';
import styles from './index.styles';
import SaveArticleButtonAuthenticated from './SaveArticleButtonAuthenticated/lazy';
import SaveArticleButtonGuest from './SaveArticleButtonGuest';

export interface SaveArticleButtonProps {
  articleTitle: string;
  articlePageData?: Article;
}

const SaveArticleButton = (props: SaveArticleButtonProps) => {
  const { isPersonalizationAvailable, isPersonalizationEnabled } =
    use(AccountContext);

  if (!isPersonalizationAvailable) return null;

  return (
    <div css={styles.buttonWrapper}>
      {isPersonalizationEnabled ? (
        <SaveArticleButtonAuthenticated {...props} />
      ) : (
        <SaveArticleButtonGuest />
      )}
    </div>
  );
};

export default SaveArticleButton;
