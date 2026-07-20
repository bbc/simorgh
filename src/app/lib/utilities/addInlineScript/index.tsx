export type InlineScriptProps = {
  script: string | { toString: () => string };
  parameters?: string | string[] | (string | { toString: () => string })[];
  nonce?: string | null;
};

export default ({ script, parameters, nonce }: InlineScriptProps) => {
  let inlineScript = script;
  const stringifiedParams = [parameters]
    .flat()
    .map(param => {
      if (typeof param === 'function') {
        return param.toString();
      }
      return `"${param}"`;
    })
    .join(', ');

  let paramLiteral = '';
  if (parameters && parameters.length > 0 && stringifiedParams) {
    paramLiteral = stringifiedParams;
  }

  if (typeof script === 'function') {
    inlineScript = `(${script.toString()})(${paramLiteral})`;
    console.log('&&&&&&&&&&&&&&&&&&&&&');
    console.log('I GET HERE');
    console.log('+++++++++++++++++++++');
    console.log('inlineScript - ', inlineScript);
    console.log('&&&&&&&&&&&&&&&&&&&&&');
  }

  return (
    <script type="text/javascript" {...(nonce ? { nonce } : {})}>
      {inlineScript as string}
    </script>
  );
};
