import React, { use } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { LIVE_PAGE } from '#app/routes/utils/pageTypes';

const CaptionWrapper = ({
  children,
  service,
  text,
  additionalText = null,
  describedById = null,
}) => {
  const { pageType } = use(RequestContext);
  const isLive = pageType === LIVE_PAGE;

  return (
    <div className="m-0 bg-transparent">
      {children}
      <small
        {...(describedById && { id: describedById })}
        className={`
          block text-brevier font-sans-regular text-grey-6 py-full
          ${isLive ? 'pb-0' : ''}
        `}
      >
        <span className="sr-only">
          {`${text}${additionalText ? ` ${additionalText}` : ''}`}
        </span>
      </small>
    </div>
  );
};

export default CaptionWrapper;
