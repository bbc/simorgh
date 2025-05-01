declare namespace React.JSX {
  /*
   * AMP currently doesn't have built-in types for TypeScript, but it's in their roadmap (https://github.com/ampproject/amphtml/issues/13791).
   * As a workaround you can manually create custom types (https://stackoverflow.com/a/50601125).
   */
  interface AmpListProps {
    src: string;
    items: string;
    'max-items': number;
    layout: string;
    width: string;
    height: string;
  }

  interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
    fallback?: string;
  }

  interface TemplateProps extends React.HTMLAttributes<HTMLTemplateElement> {
    type: string;
  }
  interface IntrinsicElements {
    'amp-script': React.PropsWithChildren<ScriptHTMLAttributesHTMLScriptElement>;
    'amp-list': React.PropsWithChildren<AmpListProps>;
    template: TemplateProps;
    p: ParagraphProps;
  }
}
