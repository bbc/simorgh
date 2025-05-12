import React from 'react';

export default ({
  script,
}: {
  script: string | { toString: () => string };
}) => {
  let inlineScript = script;

  if (typeof script === 'function') {
    inlineScript = `(${script.toString()})()`;
  }

  console.log({ inlineScript });

  return <script type="text/javascript">{inlineScript as string}</script>;
};
