import { HTMLAttributes } from 'react';

export type BaseRendererProps = {
  helmetMetaTags: React.ReactElement;
  helmetLinkTags: React.ReactElement;
  helmetScriptTags: React.ReactElement;
  htmlAttrs: HTMLAttributes<HTMLHtmlElement>;
  html: string;
  ids: string[];
  styles: string;
  title: React.ReactElement;
};
