import React from 'react';

export const getStyleTag = (sheet, isAmp = false) => {
  const styleTags = sheet.getStyleElement();
  if (!isAmp) return styleTags;

  // `getStyleElement()` doesn't always return an array, so wrap in a try-catch.
  // TODO: fix in https://github.com/BBC-News/simorgh/issues/976
  const styleTagsArray = Array.isArray(styleTags) ? styleTags : [styleTags];

  const inlineCss = styleTagsArray.reduce(
    (inlineStyles, currentStylesheet) =>
      // sometimes `currentStylesheet.props` is undefined in the tests. TODO: raise an issue
      currentStylesheet && currentStylesheet.props
        ? `${inlineStyles}${
            // eslint-disable-next-line no-underscore-dangle
            currentStylesheet.props.dangerouslySetInnerHTML.__html
          }`
        : inlineStyles,
    '',
  );

  return <style amp-custom="">{inlineCss}</style>;
};

export default getStyleTag;
