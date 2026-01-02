import { PropsWithChildren, use } from 'react';
import Link from 'next/link';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { RequestContext } from '#app/contexts/RequestContext';

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
  const { isLite, isAmp } = use(RequestContext);
  const NextLink = Link;
  const Anchor = 'a' as React.ElementType;
  const isSpaLink = spaLink && !isLite && !isAmp;
  const Component = isSpaLink ? NextLink : Anchor;

  const clickTracker = useClickTrackerHandler(eventTrackingData, isSpaLink);

  return (
    <Component
      {...(className && { className })}
      {...(tabIndex && { tabIndex })}
      // TODO: Remove this bit ?renderer_env=test, I only put it there for dev purposes
      href={`${href}?renderer_env=test`}
      {...(eventTrackingData && clickTracker)}
      {...props}
    >
      {children}
    </Component>
  );
};
