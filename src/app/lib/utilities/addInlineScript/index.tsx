export type InlineScriptParameter =
  | string
  | Record<string, unknown>
  | (() => boolean);

export type InlineScriptProps = {
  script: string | { toString: () => string };
  parameters?: string | InlineScriptParameter[];
  nonce?: string | null;
};

export default ({ script, parameters, nonce }: InlineScriptProps) => {
  let inlineScript = script;
  const paramList = parameters ? [parameters].flat() : [];
  const paramLiteral = paramList
    .map(param => {
      if (typeof param === 'function') {
        return param.toString();
      }
      if (typeof param === 'object' && param !== null) {
        return JSON.stringify(param);
      }
      return `"${param}"`;
    })
    .join(', ');

  if (typeof script === 'function') {
    inlineScript = `(${script.toString()})(${paramLiteral})`;
  }

  return (
    <script type="text/javascript" {...(nonce ? { nonce } : {})}>
      {inlineScript as string}
    </script>
  );
};
