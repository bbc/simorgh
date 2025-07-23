/** @jsx jsx */
import { jsx } from '@emotion/react';
import { use } from 'react';
import isLive from '#app/lib/utilities/isLive';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './index.styles';

type ReadTimeProps = {
  readTime: number;
  className?: string;
};

const ReadTime = ({ readTime, className }: ReadTimeProps) => {
  if (!readTime || isLive()) return null;

  const { translations } = use(ServiceContext);
  const readTimeTranslation =
    translations.media.readTime || 'Estimated Read Time';
  const minutesLabel = readTime === 1 ? 'minute' : 'minutes';

  return (
    <div className={className} css={styles.readTime}>
      <p>
        {readTimeTranslation}: {readTime} {minutesLabel}
      </p>
    </div>
  );
};

export default ReadTime;
