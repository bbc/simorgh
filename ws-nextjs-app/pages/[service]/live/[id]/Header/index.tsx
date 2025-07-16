import React from 'react';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import LiveHeaderMedia from '#app/components/LiveHeaderMedia';
import { MediaCollection } from '#app/components/MediaLoader/types';

import MaskedImage from '#app/components/MaskedImage';
import { useState } from 'react';
import LiveLabelHeader from './LiveLabelHeader';

const Header = ({
  showLiveLabel,
  title,
  description,
  imageUrl,
  imageUrlTemplate,
  imageWidth,
  mediaCollections,
}: {
  showLiveLabel: boolean;
  title: string;
  description?: string;
  imageUrl?: string;
  imageUrlTemplate?: string;
  imageWidth?: number;
  mediaCollections?: MediaCollection[] | null;
}) => {
  const [isMediaOpen, setLiveMediaOpen] = useState(false);
  const isHeaderImage = !!imageUrl && !!imageUrlTemplate && !!imageWidth;
  const isWithImageLayout = isHeaderImage || !!mediaCollections;

  const watchVideoClickHandler = () => {
    setLiveMediaOpen(!isMediaOpen);
  };

  const Title = (
    <span
      className={`block text-grey-1 w-full ${
        !isWithImageLayout ? 'mt-8 group-0:mt-4 group-4:w-2/3 group-4:inline-flex group-4:mt-0 group-5:w-3/4' : ''
      }`}
    >
      {title}
    </span>
  );

  return (
    <div className="flex flex-col relative">
      <div className="absolute top-0 bottom-0 w-full overflow-hidden">
        <div className="bg-grey-10 w-full top-0 bottom-0 absolute" />
      </div>
      <div className="group-4:max-w-[63rem] group-4:mx-auto group-4:relative group-4:w-full">
        <div className={isMediaOpen ? 'group-4:opacity-0' : ''}>
          {isHeaderImage ? (
            <MaskedImage
              imageUrl={imageUrl}
              imageUrlTemplate={imageUrlTemplate}
              imageWidth={imageWidth}
            />
          ) : null}
        </div>
        <div
          className={`relative ${
            isWithImageLayout
              ? 'p-4 px-4 pb-8 group-2:p-4 group-2:px-8 group-2:pb-8 group-4:p-8 group-4:min-h-[27.5rem] group-4:h-full group-4:flex group-4:flex-col group-4:justify-center group-4:max-w-1/2'
              : 'p-8 px-4 max-w-[63rem] mx-auto group-2:p-8 group-4:pt-12 group-4:pb-16'
          } ${mediaCollections ? 'group-4:min-h-0 group-4:p-8 group-4:pt-10 group-4:pb-0 group-4:max-w-1/2' : ''}`}
        >
          <Heading
            size="trafalgar"
            level={1}
            id="content"
            tabIndex={-1}
            className="focus:outline-none"
          >
            {showLiveLabel ? (
              <LiveLabelHeader isHeaderImage={isWithImageLayout}>
                {Title}
              </LiveLabelHeader>
            ) : (
              Title
            )}
          </Heading>
          {description && (
            <Text
              as="p"
              className={`text-grey-2 m-0 mt-8 ${
                showLiveLabel && !isWithImageLayout
                  ? 'group-4:ml-[33.33%] group-5:ml-1/4'
                  : ''
              }`}
            >
              {description}
            </Text>
          )}
        </div>
        {mediaCollections && (
          <div
            className={`p-0 px-4 pb-8 group-2:p-0 group-2:px-8 group-2:pb-8 group-4:p-8 group-4:px-8 group-4:pb-10 group-4:max-w-1/2 ${
              isMediaOpen ? 'group-4:max-w-full' : ''
            }`}
          >
            <LiveHeaderMedia
              mediaCollection={mediaCollections}
              clickCallback={watchVideoClickHandler}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
