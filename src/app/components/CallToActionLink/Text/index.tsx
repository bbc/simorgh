import React, { PropsWithChildren, use } from 'react';
import Text from '#app/components/Text';
import CallToActionLinkContext from '../CallToActionLinkContext';

type TextProps = {
  as?: string;
  className?: string;
  shouldUnderlineOnHoverFocus?: boolean;
};

export default ({
  as,
  children,
  className,
  shouldUnderlineOnHoverFocus,
}: PropsWithChildren<TextProps>) => {
  const { fontVariant, size } = use(CallToActionLinkContext);
  
  const textClasses = shouldUnderlineOnHoverFocus
    ? 'text-inherit [a:focus_&]:underline [a:hover_&]:underline'
    : 'text-inherit border-b border-grey-10 [a:visited_&]:text-metal [a:visited_&]:border-metal [a:focus_&]:text-postbox [a:focus_&]:border-b-2 [a:focus_&]:border-postbox [a:hover_&]:text-postbox [a:hover_&]:border-b-2 [a:hover_&]:border-postbox';
  
  return (
    <Text
      as={as}
      size={size}
      fontVariant={fontVariant}
      className={`${textClasses} ${className || ''}`}
    >
      {children}
    </Text>
  );
};
