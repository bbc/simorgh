import React from 'react';

export default ({
  script,
  parameters = '',
}: {
  script: string | { toString: () => string };
  parameters?: string;
}) => {
  let inlineScript = script;

  if (typeof script === 'function') {
    inlineScript = `(${script.toString()})(${parameters && `'${parameters}'`})`;
  }

  return <script type="text/javascript">{inlineScript as string}</script>;
};
