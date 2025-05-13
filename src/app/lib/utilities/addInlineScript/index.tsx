import React from 'react';

export type InlineScriptProps = {
  script: string | { toString: () => string };
  parameters?: string | string[];
};

export default ({ script, parameters }: InlineScriptProps) => {
  let inlineScript = script;
  const stringifiedParams = [parameters]
    .flat()
    .map(param => `"${param}"`)
    .join(', ');

  let paramLiteral = '';
  if (parameters && parameters.length > 0 && stringifiedParams) {
    paramLiteral = stringifiedParams;
  }

  if (typeof script === 'function') {
    inlineScript = `(${script.toString()})(${paramLiteral})`;
  }

  return <script type="text/javascript">{inlineScript as string}</script>;
};
