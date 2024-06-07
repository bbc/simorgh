import React from 'react';
import styles from './index.styles';

type myProps = {
  timestamp: string;
};

const TranscriptTimestamp = ({ timestamp }: myProps) => {
  return (
    <>
      {/* @ts-expect-error Property 'css' does not exist on type 'DetailedHTMLProps<TimeHTMLAttributes<HTMLTimeElement>, HTMLTimeElement>' */}
      <time css={styles.time} className="any">
        {timestamp}
      </time>
    </>
  );
};

export default TranscriptTimestamp;
