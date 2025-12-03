/** @jsx jsx */
import { Global, jsx } from '@emotion/react';
import MediaLoader from '#app/components/MediaLoader';
import { AvEmbedsPageProps } from './types';
import styles from './styles';
import AvEmbedsMetadata from './AvEmbedsMetadata';

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
