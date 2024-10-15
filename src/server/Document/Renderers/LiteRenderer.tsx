/* eslint-disable react/no-danger */
import React, { ReactElement, PropsWithChildren } from 'react';
import NO_JS_CLASSNAME from '#app/lib/noJs.const';
import { BaseRendererProps } from './types';

interface Props extends BaseRendererProps {
  bodyContent: ReactElement;
}

export default function LitePageRenderer({
  bodyContent,
  helmetMetaTags,
  helmetLinkTags,
  helmetScriptTags,
  htmlAttrs,
  title,
  styles,
}: PropsWithChildren<Props>) {
  return (
    <html lang="en-GB" className={NO_JS_CLASSNAME} {...htmlAttrs}>
      <head>
        <meta name="robots" content="noindex" />
        {title}
        {helmetMetaTags}
        {helmetLinkTags}
        {helmetScriptTags}
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove("no-js");`,
          }}
        />
      </head>
      <body>{bodyContent}</body>
    </html>
  );
}
