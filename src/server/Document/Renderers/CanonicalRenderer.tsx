/* eslint-disable react/no-danger */
import React from 'react';
import IfAboveIE9 from '#app/legacy/components/IfAboveIE9Comment';
import NO_JS_CLASSNAME from '#app/lib/noJs.const';
import { getProcessEnvAppVariables } from '#app/lib/utilities/getEnvConfig';
import serialiseForScript from '#app/lib/utilities/serialiseForScript';
import { BaseRendererProps } from './types';
import ReverbTemplate from './ReverbTemplate';
import ComponentTracking from './ComponentTracking';

interface Props extends BaseRendererProps {
  data: Record<string, unknown>;
  isApp: boolean;
  links: React.ReactElement;
  legacyScripts: React.ReactElement;
  modernScripts: React.ReactElement;
  service?: string;
  nonce?: string | null;
}

const showScripts = (
  scripts: React.ReactElement | React.ReactElement[],
  nonce?: string | null,
) => {
  const scriptsArray = Array.isArray(scripts) ? scripts : [scripts];
  let scriptText = "const scriptcontainer = document.createElement('div');";
  scriptsArray.forEach((script: React.ReactElement) => {
    const scriptKey = (script.key ?? 'script')
      .toString()
      .replace(/[^a-zA-Z0-9]/g, '');
    type ScriptWithDataChunk = React.ScriptHTMLAttributes<HTMLScriptElement> & {
      'data-chunk'?: string;
    };

    const scriptProps = script.props as ScriptWithDataChunk;
    if (scriptProps.dangerouslySetInnerHTML) {
      scriptText += `const ${scriptKey} = document.createElement('script');`;
      scriptText += `${scriptKey}.setAttribute('id','${scriptProps.id}');`;
      scriptText += `${scriptKey}.setAttribute('type','${scriptProps.type}');`;
      if (nonce) scriptText += `${scriptKey}.setAttribute('nonce','${nonce}');`;
      /* eslint-disable no-underscore-dangle */
      scriptText += `${scriptKey}.innerHTML = ${JSON.stringify(scriptProps.dangerouslySetInnerHTML?.__html)};`;
      scriptText += `scriptcontainer.appendChild(${scriptKey});`;
    } else {
      scriptText += `const ${scriptKey} = document.createElement('script');`;
      if (nonce) scriptText += `${scriptKey}.setAttribute('nonce','${nonce}');`;
      scriptText += `${scriptKey}.setAttribute('src','${scriptProps.src}');`;
      scriptText += `${scriptKey}.setAttribute('crossOrigin','${scriptProps.crossOrigin}');`;
      scriptText += `${scriptKey}.setAttribute('type','${scriptProps.type}');`;
      scriptText += `${scriptKey}.setAttribute('defer','${scriptProps.defer}');`;
      scriptText += `${scriptKey}.setAttribute('async','${scriptProps.async}');`;
      scriptText += `${scriptKey}.setAttribute('data-chunk','${scriptProps['data-chunk'] ?? ''}');`;
      scriptText += `scriptcontainer.appendChild(${scriptKey});`;
    }
  });
  scriptText += `
        if (!((navigator && navigator.connection) && ['2g', 'slow-2g', '3g'].includes(navigator.connection.effectiveType))){ 
          document.body.appendChild(scriptcontainer);
        }
        else {
          const noscriptTag = window.document.getElementsByTagName('noscript')[0];
          const trackingDiv = document.createElement('DIV');
          trackingDiv.innerHTML = noscriptTag.innerHTML;
          window.document.body.appendChild(trackingDiv);
        }`;
  return (
    <script
      {...(nonce ? { nonce } : {})}
      // This script should be the first script tag in the body, otherwise Opera Mini has trouble parsing the `window.SIMORGH_DATA` object
      dangerouslySetInnerHTML={{
        __html: scriptText,
      }}
    />
  );
};

export default function CanonicalRenderer({
  data,
  helmetMetaTags,
  helmetLinkTags,
  helmetScriptTags,
  htmlAttrs,
  html,
  isApp,
  ids,
  links,
  legacyScripts,
  modernScripts,
  styles,
  title,
  service,
  nonce,
}: Props) {
  const serialisedData = serialiseForScript(data);
  const appEnvVariables = serialiseForScript(getProcessEnvAppVariables());

  return (
    <html lang="en-GB" className={NO_JS_CLASSNAME} {...htmlAttrs}>
      <head>
        <ReverbTemplate nonce={nonce} />
        {isApp && <meta name="robots" content="noindex" />}
        {title}
        {helmetMetaTags}
        {helmetLinkTags}
        {helmetScriptTags}
        <style
          data-emotion-css={ids?.join(' ')}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{ __html: styles }}
        />
        <script
          {...(nonce ? { nonce } : {})}
          dangerouslySetInnerHTML={{
            // Read env variables from the server and expose them to the client
            __html: `window.SIMORGH_ENV_VARS=${appEnvVariables}`,
          }}
        />
        <ComponentTracking
          {...(nonce ? { nonce } : {})}
          trackComponentViews={false}
          enableStaticClickTrackingOnOperaMiniOnly={true}
        />
      </head>
      <body>
        <div
          id="root"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{ __html: html || '' }}
        />
        <script
          {...(nonce ? { nonce } : {})}
          // This script should be the first script tag in the body, otherwise Opera Mini has trouble parsing the `window.SIMORGH_DATA` object
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            __html: `window.SIMORGH_DATA=${serialisedData}`,
          }}
        />
        {links}
        <IfAboveIE9>
          {['urdu', 'hausa'].includes(service ?? '')
            ? showScripts(modernScripts, nonce)
            : modernScripts}
          {legacyScripts}
        </IfAboveIE9>
        <script
          {...(nonce ? { nonce } : {})}
          type="text/javascript"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove("no-js");`,
          }}
        />
      </body>
    </html>
  );
}
