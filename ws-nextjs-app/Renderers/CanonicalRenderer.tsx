import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { BaseRendererProps } from '#server/Document/Renderers/types';
import { EnvConfig } from '#app/lib/utilities/getEnvConfig';

interface Props extends BaseRendererProps {
  clientSideEnvVariables: EnvConfig;
  isApp: boolean;
}

export default function CanonicalRenderer({
  clientSideEnvVariables,
  helmetMetaTags,
  helmetLinkTags,
  helmetScriptTags,
  htmlAttrs,
  isApp,
  title,
}: Props) {
  return (
    <Html {...htmlAttrs} className="no-js">
      <Head>
        <script
          type="text/javascript"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove("no-js");`,
          }}
        />
        <Script id="simorgh-envvars" strategy="beforeInteractive">
          {`window.SIMORGH_ENV_VARS=${JSON.stringify(clientSideEnvVariables)}`}
        </Script>
        {isApp && <meta name="robots" content="noindex" />}
        {title}
        {helmetMetaTags}
        {helmetLinkTags}
        {helmetScriptTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
