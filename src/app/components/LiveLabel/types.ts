import { ReactNode } from 'react';

export interface LiveLabelProps extends TextProps {
  className?: string;
}

export interface TextProps {
  className?: string;
  offScreenText?: string;
  lang?: string;
  id?: string;
  isHeaderImage?: boolean;
  pulse?: ReactNode;
}

export interface PulseProps {
  className?: string;
  width: string;
  height: string;
}
