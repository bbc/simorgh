import React, { use } from 'react';
import useViewTracker from '#app/hooks/useViewTracker';
import { EventTrackingMetadata } from '#app/models/types/eventTracking';
import {
  GROUP_2_MAX_WIDTH,
  GROUP_3_MIN_WIDTH,
} from '#app/components/ThemeProvider/mediaQueries';
import Paragraph from '../Paragraph';
import Heading from '../Heading';
import Image from '../Image';
import CallToActionLink from '../CallToActionLink';

interface MessageBannerProps {
  heading: string;
  description?: string;
  link: string;
  linkText: string;
  image?: string;
  id?: string;
  eventTrackingData?: EventTrackingMetadata;
}

const IMAGE_WIDTH = 184;
const IMAGE_WIDTH_GROUP_3_MIN_WIDTH = 224;

const MessageBanner = ({
  heading,
  description,
  link,
  linkText,
  image,
  id = 'message-banner-1',
  eventTrackingData,
}: MessageBannerProps) => {
  const viewTracker = useViewTracker(eventTrackingData);

  const IMAGE_SRC_SMALL_2X_UPSCALE_WIDTH = IMAGE_WIDTH * 2;
  const IMAGE_SRC_LARGE_2X_UPSCALE_WIDTH = IMAGE_WIDTH_GROUP_3_MIN_WIDTH * 2;

  const replaceWidth = (width: number) => image?.replace('{width}', `${width}`);

  const imgSrcSmall = replaceWidth(IMAGE_WIDTH);
  const imgSrcSmall2x = replaceWidth(IMAGE_SRC_SMALL_2X_UPSCALE_WIDTH);
  const imgSrcLarge = replaceWidth(IMAGE_WIDTH_GROUP_3_MIN_WIDTH);
  const imgSrcLarge2x = replaceWidth(IMAGE_SRC_LARGE_2X_UPSCALE_WIDTH);

  return (
    <section
      className="pt-8 pb-8"
      role="region"
      aria-labelledby={id}
      data-testid={id}
    >
      <div
        {...viewTracker}
        className="h-auto bg-gradient-to-br from-[#A20219] via-[#180109] to-[#500115] px-4 group-3:bg-gradient-to-br group-3:from-[#A20219] group-3:via-[#180109] group-3:to-[#180109] forced-colors:border-[3px] forced-colors:border-transparent"
      >
        <div className="group-3:w-2/3 group-4:w-3/4">
          <Heading
            level={2}
            size="paragon"
            className="pt-6 pb-2 text-white"
            id={id}
          >
            {heading}
          </Heading>
          <Paragraph size="longPrimer" className="pb-4 text-white">
            {description}
          </Paragraph>
        </div>
        <div className="flex flex-col-reverse items-center group-3:flex-row-reverse group-3:justify-start group-3:items-end group-3:relative">
          <CallToActionLink
            url={link}
            className="focusIndicatorInvert p-4 bg-white mx-4 mb-4 w-full text-black hover:bg-[#F6F6F6] focus:bg-[#F6F6F6] group-3:w-auto group-3:max-w-[calc(100%-240px)] group-3:mx-0 group-3:mb-6 group-3:pb-4"
            eventTrackingData={eventTrackingData}
          >
            <CallToActionLink.ButtonLikeWrapper>
              <CallToActionLink.Text shouldUnderlineOnHoverFocus>
                {linkText}
                <CallToActionLink.Chevron />
              </CallToActionLink.Text>
            </CallToActionLink.ButtonLikeWrapper>
          </CallToActionLink>
          {image && (
            <div className="max-w-[184px] group-3:max-w-[224px] group-3:absolute group-3:right-0">
              <Image
                alt=""
                src={imgSrcLarge as string}
                srcSet={`${imgSrcSmall} ${IMAGE_WIDTH}w, 
                          ${imgSrcSmall2x} ${IMAGE_SRC_SMALL_2X_UPSCALE_WIDTH}w, 
                          ${imgSrcLarge} ${IMAGE_WIDTH_GROUP_3_MIN_WIDTH}w, 
                          ${imgSrcLarge2x} ${IMAGE_SRC_LARGE_2X_UPSCALE_WIDTH}w`}
                sizes={`${GROUP_2_MAX_WIDTH.replace(
                  '@media ',
                  '',
                )} ${IMAGE_WIDTH}px, ${IMAGE_WIDTH_GROUP_3_MIN_WIDTH}px`}
                placeholder={false}
                aspectRatio={[16, 9]}
                className="object-top"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MessageBanner;
