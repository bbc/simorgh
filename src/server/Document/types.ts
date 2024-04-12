import { HTMLAttributes } from 'react';

export type BaseRendererProps = {
  htmlAttrs: HTMLAttributes<HTMLHtmlElement>;
  title: React.ReactElement;
  helmetMetaTags: React.ReactElement;
  helmetLinkTags: React.ReactElement;
  helmetScriptTags: React.ReactElement;
};
