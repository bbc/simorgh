/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { use, useId } from 'react';
import { jsx } from '@emotion/react';
import getOriginCode from '#app/lib/utilities/imageSrcHelpers/originCode';
import { Summary } from '#app/models/types/curationData';
import { RequestContext } from '#app/contexts/RequestContext';
import { createSrcsets } from '#lib/utilities/srcSet';
import getLocator from '#lib/utilities/imageSrcHelpers/locator';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import BASE64_PLACEHOLDER_IMAGE from '#app/components/Image/base64Placeholder';
import Heading from '../Heading';
import Image from '../Image';

interface SocialLinksProps {
  id?: string;
  title: string;
  summaries: Summary[];
}

const IMAGE_SIZE_GROUP_1 = 80;
const IMAGE_SIZE_GROUP_2 = 55;
const IMAGE_SIZE_GROUP_3 = 80;
const IMAGE_SIZE_GROUP_4 = 67;

const SocialLinkImage = ({ imageUrl }: { imageUrl: string }) => {
  const { isLite } = use(RequestContext);
  const DEFAULT_IMAGE_SIZE = IMAGE_SIZE_GROUP_1;
  const DEFAULT_IMAGE_SIZE_2X = DEFAULT_IMAGE_SIZE * 2;

  const [, imagePath] = imageUrl?.split('{width}') || [];

  if (isLite) {
    return null;
  }

  if (!imagePath) {
    return (
      <div
        className="w-20 h-20 group-2:w-[55px] group-2:h-[55px] group-3:w-20 group-3:h-20 group-4:w-[67px] group-4:h-[67px] flex-shrink-0 bg-lunar border border-stone bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${BASE64_PLACEHOLDER_IMAGE})`,
          backgroundSize: '75%',
        }}
        aria-hidden="true"
        data-testid="social-link-image-placeholder"
      />
    );
  }

  const { primarySrcset, primaryMimeType, fallbackSrcset, fallbackMimeType } =
    createSrcsets({
      originCode: getOriginCode(imagePath),
      locator: getLocator(imagePath),
      imageResolutions: [DEFAULT_IMAGE_SIZE, DEFAULT_IMAGE_SIZE_2X],
      originalImageWidth: DEFAULT_IMAGE_SIZE_2X,
    });

  return (
    <Image
      className="w-20 h-20 group-2:w-[55px] group-2:h-[55px] group-3:w-20 group-3:h-20 group-4:w-[67px] group-4:h-[67px] flex-shrink-0"
      width={DEFAULT_IMAGE_SIZE}
      src={imageUrl.replace('{width}', String(DEFAULT_IMAGE_SIZE))}
      srcSet={primarySrcset}
      mediaType={primaryMimeType || ''}
      fallbackSrcSet={fallbackSrcset || ''}
      fallbackMediaType={fallbackMimeType || ''}
      lazyLoad
      alt=""
    />
  );
};

const SocialLink = ({ summary }: { summary: Summary }) => {
  const linkLabelId = useId();
  const hasDescription = Boolean(summary.description);

  return (
    <>
      <SocialLinkImage imageUrl={summary.imageUrl} />
      <a
        href={summary.link}
        className="text-grey-10 no-underline text-pica font-sans-bold overflow-hidden visited:text-grey-6 hover:underline hover:decoration-2 focus:underline focus:decoration-2 absolute inset-0"
        {...(hasDescription && { 'aria-labelledby': linkLabelId })}
      >
        {hasDescription ? (
          // eslint-disable-next-line jsx-a11y/aria-role
          <span id={linkLabelId} role="text">
            {summary.title}
            <VisuallyHiddenText>{`, ${summary.description}`}</VisuallyHiddenText>
          </span>
        ) : (
          summary.title
        )}
      </a>
    </>
  );
};

const SocialLinks = ({
  title,
  summaries = [],
  id = 'social-links-1',
}: SocialLinksProps) => {
  if (!summaries.length) {
    return null;
  }

  const hasMultipleItems = summaries.length > 1;

  return (
    <section
      role="region"
      aria-labelledby={id}
      data-testid={id}
      className="mt-16 mb-12"
    >
      <Heading level={2} id={id} className="text-double-pica font-sans-bold mb-12">
        {title}
      </Heading>
      {hasMultipleItems ? (
        <ul 
          className="p-0 m-0 grid list-none gap-8 group-2:grid-cols-2 group-4:grid-cols-4 group-4:gap-12" 
          role="list"
        >
          {summaries.map(summary => {
            return (
              <li 
                className="relative flex min-w-0 items-center gap-4 group-3:gap-8" 
                key={summary.title}
              >
                <SocialLink summary={summary} />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="relative flex min-w-0 items-center gap-4 group-3:gap-8">
          <SocialLink summary={summaries[0]} />
        </div>
      )}
    </section>
  );
};

export default SocialLinks;
