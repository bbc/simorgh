import React from 'react';

const sanitizeScript = (input: string) => {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(input));
  return div.innerHTML;
};

export default ({
  script,
}: {
  script: string | { toString: () => string };
}) => {
  let inlineScript = script;

  if (typeof script === 'function') {
    inlineScript = `(${script.toString()})()`;
  }

  return (
    <script type="text/javascript">
      {sanitizeScript(inlineScript.toString())}
    </script>
  );
};
