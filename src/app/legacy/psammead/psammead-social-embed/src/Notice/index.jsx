import React, { memo } from 'react';
import { detokenise, dictionaryFactory } from '../utilities';

const Notice = ({
  provider,
  service,
  text,
  linkText,
  linkTextSuffixVisuallyHidden = null,
  linkHref,
  warningText = null,
}) => {
  const dictionary = dictionaryFactory({ provider });
  const [detokenisedLinkText, detokenisedLinkTextSuffix] = [
    detokenise(linkText, dictionary),
    detokenise(linkTextSuffixVisuallyHidden, dictionary),
  ];

  return (
    <div className="font-sans text-body-copy border border-pebble rounded-full text-shadow p-4">
      <p data-testid="social-embed-fallback-title" className="mt-0 mb-2">
        {detokenise(text, dictionary)}
      </p>
      <a
        href={linkHref}
        aria-label={
          detokenisedLinkTextSuffix &&
          `${detokenisedLinkText}${detokenisedLinkTextSuffix}`
        }
        className="block font-sans-bold text-ebon no-underline visited:text-metal hover:underline focus:underline"
      >
        {detokenisedLinkText}
      </a>
      {warningText && <small className="block mt-2 text-minion">{warningText}</small>}
    </div>
  );
};

export default memo(Notice);
