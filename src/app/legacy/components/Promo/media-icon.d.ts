import { ReactNode } from 'react';

interface MediaIconProps {
  type?: string | null;
  children?: ReactNode;
  className?: string;
}

declare const MediaIcon: (props: MediaIconProps) => JSX.Element | null;

export default MediaIcon;
