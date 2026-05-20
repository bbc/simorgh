// biome-ignore-all lint/security/noDangerouslySetInnerHtml: we want this
import type { PropsWithChildren, ReactElement } from 'react';

import { OptOutOfLiteRedirect } from '#src/server/utilities/CanonicalToLiteRedirect';
import ComponentTracking from './ComponentTracking';
import type { BaseRendererProps } from './types';

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
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <OptOutOfLiteRedirect />
        {/* IMPORTANT: ComponentTracking MUST come before helmetScriptTags due to synchronous calls from helmetScriptTags to functions within ComponentTracking */}
        <ComponentTracking
          enableStaticClickTrackingOnOperaMiniOnly={false}
          trackComponentViews
        />
        {helmetScriptTags}
      </head>
      <body>{bodyContent}</body>
    </html>
  );
}
