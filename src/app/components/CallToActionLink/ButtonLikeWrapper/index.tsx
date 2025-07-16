import React, { PropsWithChildren } from 'react';

type ButtonLikeWrapperProps = {
  className?: string;
};

const ButtonLikeWrapper = ({
  children,
  className,
}: PropsWithChildren<ButtonLikeWrapperProps>) => {
  return (
    <div className={`flex flex-row justify-center ${className || ''}`}>
      {children}
    </div>
  );
};

export default ButtonLikeWrapper;
