import React, { ReactElement, PropsWithChildren } from 'react';
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
    <html lang="en-GB" {...htmlAttrs}>
      <head>
        <meta name="robots" content="noindex" />
        {title}
        {helmetMetaTags}
        {helmetLinkTags}
        {helmetScriptTags}
        <style
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: styles || '' }}
        />
      </head>
      <body>{bodyContent}</body>
    </html>
  );
}
