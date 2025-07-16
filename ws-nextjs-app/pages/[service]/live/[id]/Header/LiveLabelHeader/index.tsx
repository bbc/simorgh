import React, { PropsWithChildren } from 'react';
import { LiveLabelProps } from '#app/components/LiveLabel/types';
import LivePulse from '#app/components/LivePulse';
import LiveText from '#app/components/LiveText';

interface LiveLabelPromoProps extends LiveLabelProps {
  isHeaderImage: boolean;
}

const LiveLabelHeader = ({
  lang = 'en-GB',
  id,
  children,
  offScreenText,
  className,
  isHeaderImage,
}: PropsWithChildren<LiveLabelPromoProps>) => {
  return (
    <div data-testid="live-label">
      <LivePulse
        className={`${className} w-10 h-10 text-live-light align-middle mr-2 group-1:w-12 group-1:h-12 group-3:w-14 group-3:h-14`}
        width="24"
        height="24"
      />
      <LiveText
        lang={lang}
        id={id}
        offScreenText={offScreenText}
        className={
          isHeaderImage
            ? '[&_span:first-of-type]:text-live-light [&_span:first-of-type]:align-middle [&_span:first-of-type]:inline group-3:[&_span:first-of-type]:font-sansBold group-3:[&_span:first-of-type]:text-paragon [&_span:nth-of-type(3)]:mt-8'
            : '[&_span:first-of-type]:inline-flex [&_span:first-of-type]:text-live-light [&_span:first-of-type]:align-middle [&_span:first-of-type]:break-anywhere [&_span:first-of-type]:mr-0 group-0:[&_span:first-of-type]:inline group-3:[&_span:first-of-type]:font-sansBold group-3:[&_span:first-of-type]:text-paragon group-4:[&_span:first-of-type]:w-[calc(33.33%-6rem)] group-5:[&_span:first-of-type]:w-[calc(25%-6rem)]'
        }
      >
        {children}
      </LiveText>
    </div>
  );
};

export default LiveLabelHeader;
