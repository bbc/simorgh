import React from 'react';
import { detokenise, dictionaryFactory } from '../utilities';

const SkipLinkWrapper = ({
  provider,
  service,
  endTextId,
  text,
  children,
  endTextVisuallyHidden,
  describedById = null,
}) => {
  const dictionary = dictionaryFactory({ provider });
  return (
    <div className="relative no-js:hidden">
      <a
        href={`#${detokenise(endTextId, dictionary)}`}
        className="focusIndicatorRemove font-sans text-brevier bg-white border-2 border-ebon block left-0 leading-4 p-3 absolute no-underline top-0 z-10 focus:not-sr-only sr-only"
        {...(describedById && { 'aria-describedby': describedById })}
      >
        <span className="text-ebon hover:text-postbox focus:text-postbox hover:border-b-2 hover:border-postbox focus:border-b-2 focus:border-postbox">
          {detokenise(text, dictionary)}
        </span>
      </a>
      {children}
      <p 
        tabIndex="-1" 
        id={detokenise(endTextId, dictionary)}
        className="sr-only"
      >
        {detokenise(endTextVisuallyHidden, dictionary)}
      </p>
    </div>
  );
};

export default SkipLinkWrapper;
