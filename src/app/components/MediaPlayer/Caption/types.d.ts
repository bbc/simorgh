declare namespace JSX {
  interface ParagraphProps
    extends React.HtmlHTMLAttributes<HTMLParagraphElement> {
    key?: string | null;
  }
  interface IntrinsicElements {
    p: ParagraphProps;
  }
}
