import React, { ReactElement, PropsWithChildren } from 'react';
import { BaseRendererProps } from './types';
import ComponentTracking from './ComponentTracking';

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
        <meta name="robots" content="none" />
        {title}
        {helmetMetaTags}
        {helmetLinkTags}
        {helmetScriptTags}
        <style
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{ __html: styles }}
        />
        <ComponentTracking
          enableStaticClickTrackingOnOperaMiniOnly={false}
          trackComponentViews={true}
        />
      </head>
      <body>{bodyContent}</body>
    </html>
  );
}
