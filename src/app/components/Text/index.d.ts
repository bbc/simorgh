declare type TextProps = {
    children: JSX.Element | JSX.Element[];
    className: string;
};
declare const Text: ({ children, className }: TextProps) => JSX.Element;
export default Text;
