/* eslint-disable react/no-danger */
import React from 'react';
import { BaseRendererProps } from './types';

export default function LitePageRenderer({
  helmetMetaTags,
  helmetLinkTags,
  helmetScriptTags,
  htmlAttrs,
  html,
  title,
  styles,
}: BaseRendererProps) {
  return (
    <html lang="en-GB" {...htmlAttrs}>
      <head>
        <meta name="robots" content="noindex" />
        {title}
        {helmetMetaTags}
        {helmetLinkTags}
        {helmetScriptTags}
        <style dangerouslySetInnerHTML={{ __html: styles || '' }} />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: html || '' }} />
      </body>
    </html>
  );
}
