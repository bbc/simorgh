import React from 'react';

type TextProps = {
  children: JSX.Element | JSX.Element[];
  className: string;
};

const Text = ({ children, className }: TextProps) => (
  <span className={className}>{children}</span>
);

export default Text;
