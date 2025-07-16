import React from 'react';
import detokenise from '#psammead/psammead-detokeniser/src';

const SkipLinkWrapper = ({
  service,
  endTextId,
  children,
  text,
  endTextVisuallyHidden,
  terms,
}) => {
  return (
    <div className="relative">
      <a
        className={`
          font-sans-bold text-brevier
          bg-white border-2 border-ebon text-ebon
          block left-0 leading-none p-3 absolute top-0 z-10
          no-underline
          focus:sr-only-off focus:not-sr-only
          active:sr-only-off active:not-sr-only
          sr-only
        `}
        href={`#${endTextId}`}
      >
        {detokenise(text, terms)}
      </a>
      {children}
      <p className="sr-only" tabIndex="-1" id={endTextId}>
        {detokenise(endTextVisuallyHidden, terms)}
      </p>
    </div>
  );
};

export default SkipLinkWrapper;
