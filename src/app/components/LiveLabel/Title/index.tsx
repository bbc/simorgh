/** @jsx jsx */
/** @jsxRuntime classic */
import { PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';

const Title = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

export default Title;
