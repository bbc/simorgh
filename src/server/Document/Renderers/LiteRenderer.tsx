/* eslint-disable react/no-danger */
import React, { ReactElement, PropsWithChildren } from 'react';
import { BaseRendererProps } from './types';
import LiteTrackingTemplate from './LiteTrackingTemplate';

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
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <LiteTrackingTemplate />
      </head>
      <body>{bodyContent}</body>
    </html>
  );
}
