import React from 'react';

export type InlineScriptProps = {
  script: string | { toString: () => string };
  parameters?: string;
};

export default ({ script, parameters = '' }: InlineScriptProps) => {
  let inlineScript = script;

  if (typeof script === 'function') {
    inlineScript = `(${script.toString()})(${parameters && `'${parameters}'`})`;
  }

  return <script type="text/javascript">{inlineScript as string}</script>;
};
