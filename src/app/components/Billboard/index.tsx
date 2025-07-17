import React from 'react';
import { use } from 'react';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { EventTrackingMetadata } from '#app/models/types/eventTracking';
import { Summary } from '#app/models/types/curationData';
import isLive from '#app/lib/utilities/isLive';
import Heading from '../Heading';
import MaskedImage from '../MaskedImage';
import Text from '../Text';
import LivePulse from '../LivePulse';
import LiveText from '../LiveText';
import { ServiceContext } from '../../contexts/ServiceContext';
import BillboardCurationGrid from './BillboardCurationGrid';

interface BillboardProps {
  heading: string;
  description: string;
  link: string;
  image: string;
  altText: string;
  id?: string;
  eventTrackingData?: EventTrackingMetadata;
  showLiveLabel?: boolean;
  summaries?: Summary[];
}

export default ({
  heading,
  description,
  link,
  image,
  altText,
  id = 'billboard',
  eventTrackingData,
  showLiveLabel,
  summaries = [],
}: BillboardProps) => {
  const viewTracker = useViewTracker(eventTrackingData);
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);
  const { translations } = use(ServiceContext);
  const showMoreOnThisTitle = translations.moreOnThis;
  return (
    <section role="region" aria-labelledby={id} data-testid={id}>
      <div className="flex flex-col relative forced-colours:border-[3px] forced-colours:border-transparent" {...viewTracker}>
        <div className="z-20 absolute top-0 bg-black bottom-0 w-full overflow-hidden" />
        <div className="z-30 pb-quadruple group-4:max-w-[80rem] group-4:mx-auto group-4:relative group-4:w-full">
          <MaskedImage
            imageUrl={image.replace('{width}', '240')}
            imageUrlTemplate={image}
            altText={altText}
            imageWidth={660}
            showPlaceholder={false}
          />
          <div className="p-full_full_double group-2:p-full_double_double group-4:p-double group-4:min-h-[27.5rem] group-4:h-full group-4:flex group-4:flex-col group-4:justify-center group-4:max-w-1/2">
            <Heading 
              level={2} 
              size="paragon" 
              className="pb-full text-white no-underline group-1:pb-double group-4:pb-full"
              id={id}
            >
              <a 
                href={link} 
                className="no-underline block text-white cursor-pointer hover:underline focus:underline visited:text-grey-5 before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:content-['']"
                {...clickTrackerHandler}
              >
                {showLiveLabel ? (
                  <div data-testid="billboard-live-label">
                    <LivePulse
                      width="24"
                      height="24"
                      className="w-[2.5rem] h-[2.5rem] text-live-light group-1:w-triple group-1:h-triple group-3:w-[3.5rem] group-3:h-[3.5rem] forced-colours:text-[canvasText]"
                    />
                    <LiveText className="[&>span:first-of-type]:text-live-light [&>span:first-of-type]:pb-full [&>span:first-of-type]:group-1:pb-double [&>span:first-of-type]:group-4:pb-full">
                      <div>{heading}</div>
                    </LiveText>
                  </div>
                ) : (
                  <div>{heading}</div>
                )}
              </a>
            </Heading>
            {description && (
              <Text as="p" className="text-grey-2 m-0">
                {description}
              </Text>
            )}
          </div>
          {!isLive() && summaries.length > 1 && (
            <div className="w-full p-full_double_0_double box-border flex flex-col group-1:px-full">
              {showMoreOnThisTitle && (
                <Heading
                  level={2}
                  size="greatPrimer"
                  className="text-white mb-double"
                >
                  {showMoreOnThisTitle}
                </Heading>
              )}

              <BillboardCurationGrid summaries={summaries.slice(1)} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
