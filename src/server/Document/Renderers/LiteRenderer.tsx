/* eslint-disable react/no-danger */
import React from 'react';
import { Main } from 'next/document';
import { BaseRendererProps } from './types';

interface Props extends BaseRendererProps {
  isNextJs?: boolean;
}

export default function LitePageRenderer({
  helmetMetaTags,
  helmetLinkTags,
  helmetScriptTags,
  htmlAttrs,
  html,
  title,
  styles,
  isNextJs = false,
}: Props) {
  return (
    <html lang="en-GB" {...htmlAttrs}>
      <head>
        <meta name="robots" content="noindex" />
        {title}
        {helmetMetaTags}
        {helmetLinkTags}
        {helmetScriptTags}
        {!isNextJs && (
          <style dangerouslySetInnerHTML={{ __html: styles || '' }} />
        )}
      </head>
      <body>
        {!isNextJs ? (
          <div id="root" dangerouslySetInnerHTML={{ __html: html || '' }} />
        ) : (
          <Main />
        )}
      </body>
    </html>
  );
}
