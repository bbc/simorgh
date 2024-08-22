/** @jsx jsx */
import { Global, jsx } from '@emotion/react';
import MediaLoader from '#app/components/MediaLoader';
import { AvEmbedsPageProps } from './types';
import styles from './styles';

const AvEmbedsPageLayout = ({ pageData }: AvEmbedsPageProps) => (
  <>
    <Global styles={styles.global} />
    <div data-testid="avembeds-mediaplayer">
      <MediaLoader blocks={pageData?.mediaBlock} css={styles.mediaPlayer} />
    </div>
  </>
);

export default AvEmbedsPageLayout;
