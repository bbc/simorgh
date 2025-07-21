/** @jsx jsx */
import { jsx } from '@emotion/react';
import styles from './index.styles';

type ReadTimeProps = {
  readTimeValue: number | undefined;
  className?: string;
};

const ReadTime =({ readTimeValue, className }: ReadTimeProps) => {
    if (readTimeValue === undefined) return false;

  return (
    <div className={className} css={styles.prototype}>
      <p>
        read time: { (readTimeValue + " minutes") || "no read time supplied"}
      </p>
    </div>
  );
}

export default ReadTime;