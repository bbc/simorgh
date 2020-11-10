import React from 'react';

export const getStyleTag = (sheet, isAmp = false) => {
  const styleTags = sheet.getStyleElement();
  if (!isAmp) return styleTags;

  const inlineCss = styleTags.reduce((inlineStyles, currentStylesheet) => {
    if (currentStylesheet && currentStylesheet.props) {
      return `${inlineStyles}${
        // eslint-disable-next-line no-underscore-dangle
        currentStylesheet.props.dangerouslySetInnerHTML.__html
      }`;
    }
    return inlineStyles;
  }, '');

  return (
    // eslint-disable-next-line react/no-danger
    <style amp-custom="" dangerouslySetInnerHTML={{ __html: inlineCss }} />
  );
};

export default getStyleTag;
