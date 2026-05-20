import { Global } from '@emotion/react';

import MediaLoader from '#app/components/MediaLoader';
import AvEmbedsMetadata from './AvEmbedsMetadata';
import styles from './styles';
import { AvEmbedsPageProps } from './types';

const AvEmbedsPageLayout = ({ pageData }: AvEmbedsPageProps) => (
  <>
    <Global styles={styles.global} />
    <AvEmbedsMetadata pageData={pageData} />
    <div data-testid="avembeds-mediaplayer">
      <MediaLoader
        blocks={pageData?.mediaBlock}
        css={styles.mediaPlayer}
        embedded
      />
    </div>
  </>
);

export default AvEmbedsPageLayout;
