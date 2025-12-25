import { PropsWithChildren } from 'react';
import Link from 'next/link';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';

type Props = {
  href: string;
  className?: string;
  spaLink?: boolean;
  tabIndex?: number;
  eventTrackingData?: {
    url: string;
    block?: { componentName: string } | undefined;
  };
};

export default ({
  spaLink = true,
  children,
  href,
  className,
  tabIndex,
  eventTrackingData,
  ...props
}: PropsWithChildren<Props>) => {
  const NextLink = Link;
  const Anchor = 'a' as React.ElementType;
  const Component = spaLink ? NextLink : Anchor;

  const clickTracker = useClickTrackerHandler(eventTrackingData, spaLink);

  return (
    <Component
      {...(className && { className })}
      {...(tabIndex && { tabIndex })}
      href={`${href}?renderer_env=test`}
      {...(eventTrackingData && clickTracker)}
      {...props}
    >
      {children}
    </Component>
  );
};
