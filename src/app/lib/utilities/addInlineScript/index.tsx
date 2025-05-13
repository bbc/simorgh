import React from 'react';

export default ({
  script,
  parameters,
}: {
  script: string | { toString: () => string };
  parameters?: string[];
}) => {
  let inlineScript = script;
  const stringifiedParams = parameters?.map(param => `'${param}'`).join(', ');

  let paramLiteral = '';
  if (parameters && parameters.length > 0 && stringifiedParams) {
    paramLiteral = stringifiedParams;
  }

  if (typeof script === 'function') {
    inlineScript = `(${script.toString()})(${paramLiteral})`;
  }

  return <script type="text/javascript">{inlineScript as string}</script>;
};
