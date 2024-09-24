/* eslint-disable react/no-danger */
import React, { ReactElement } from 'react';
import { AMP_GEO_SCRIPT } from '#components/AmpGeo';
import {
  AMP_SCRIPT,
  AMP_NO_SCRIPT,
  AMP_JS,
  AMP_CONSENT_JS,
  AMP_ANALYTICS_JS,
} from '#app/components/AmpScripts';
import { BaseRendererProps } from './types';

interface Props extends BaseRendererProps {
  bodyContent: ReactElement;
}
export default function AmpRenderer({
  bodyContent,
  helmetMetaTags,
  helmetLinkTags,
  helmetScriptTags,
  htmlAttrs,
  ids,
  styles,
  title,
}: Props) {
  return (
    <html lang="en-GB" {...htmlAttrs}>
      <head>
        {title}
        {helmetMetaTags}
        {helmetLinkTags}
        {helmetScriptTags}
        <style
          amp-custom=""
          data-emotion-css={ids?.join(' ')}
          dangerouslySetInnerHTML={{ __html: styles }}
        />
        <style amp-boilerplate="">{AMP_SCRIPT}</style>
        <noscript>
          <style amp-boilerplate="">{AMP_NO_SCRIPT}</style>
        </noscript>
        {AMP_JS}
        {AMP_GEO_SCRIPT}
        {AMP_CONSENT_JS}
        {AMP_ANALYTICS_JS}
      </head>
      <body className="amp-geo-pending">{bodyContent}</body>
    </html>
  );
}
