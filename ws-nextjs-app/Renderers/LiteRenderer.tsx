import { Main } from 'next/document';
import React from 'react';
import { BaseRendererProps } from '#server/Document/Renderers/types';

export default function LiteRenderer({
  helmetLinkTags,
  helmetMetaTags,
  helmetScriptTags,
  htmlAttrs,
  title,
}: BaseRendererProps) {
  return (
    <html lang="en-GB" {...htmlAttrs}>
      <head>
        <meta name="robots" content="noindex" />
        {title}
        {helmetLinkTags}
        {helmetMetaTags}
        {helmetScriptTags}
      </head>
      <body>
        <Main />
      </body>
    </html>
  );
}
