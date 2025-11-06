/** @jsx jsx */
import { jsx } from '@emotion/react';

const LiveSummary = async (title: string, description: string) => {
  return (
    <div>
      <p>{title}</p>
      <p>{description}</p>
    </div>
  );
};

export default LiveSummary;
