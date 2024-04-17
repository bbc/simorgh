import { HTMLAttributes, ReactElement } from 'react';

export type BaseRendererProps = {
  helmetMetaTags: ReactElement;
  helmetLinkTags: ReactElement;
  helmetScriptTags: ReactElement;
  htmlAttrs: HTMLAttributes<HTMLHtmlElement>;
  html: string;
  ids?: string[];
  styles: string;
  title: ReactElement;
};
