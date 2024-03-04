export interface LiveLabelProps extends TextProps {
  className?: string;
}

export interface TextProps {
  className?: string;
  populatedChildren?: boolean;
  offScreenText?: string;
  lang?: string;
  id?: string;
}

export interface PulseProps {
  className?: string;
  width: string;
  height: string;
}

export interface ContainerProps {
  className?: string;
}
