import serialiseForScript from '../serialiseForScript';

export type InlineScriptParameter =
  | string
  | Record<string, unknown>
  | (() => boolean);

export type InlineScriptProps = {
  script: string | { toString: () => string };
  parameters?: string | InlineScriptParameter[];
  nonce?: string | null;
  setInnerHTML?: boolean;
};

export default ({
  script,
  parameters,
  nonce,
  setInnerHTML,
}: InlineScriptProps) => {
  let inlineScript = script;
  const paramList = parameters ? [parameters].flat() : [];
  const paramLiteral = paramList
    .map(param => {
      if (typeof param === 'function') {
        return param.toString();
      }
      if (typeof param === 'object' && param !== null) {
        return serialiseForScript(param);
      }
      return `"${param}"`;
    })
    .join(', ');

  if (typeof script === 'function') {
    inlineScript = `(${script.toString()})(${paramLiteral})`;
  }

  return setInnerHTML ? (
    <script
      {...(nonce ? { nonce } : {})}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: inlineScript as string,
      }}
    />
  ) : (
    <script type="text/javascript" {...(nonce ? { nonce } : {})}>
      {inlineScript as string}
    </script>
  );
};
