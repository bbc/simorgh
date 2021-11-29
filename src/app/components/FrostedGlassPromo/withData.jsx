import React from 'react';
import path from 'ramda/src/path';
import hasPath from 'ramda/src/hasPath';

import { createSrcset } from '#lib/utilities/srcSet';
import getOriginCode from '#lib/utilities/imageSrcHelpers/originCode';
import getLocator from '#lib/utilities/imageSrcHelpers/locator';

import TimestampFooter from './TimestampFooter';

const buildImageProperties = image => {
  if (!image) return null;
  const { width, height, altText, path: url, copyright } = image;
  const originCode = getOriginCode(url);
  const locator = getLocator(url);

  return {
    ratio: 52,
    srcset: createSrcset(originCode, locator, width, [280, 400]),
    sizes: '(max-width: 300px) 280px, (min-width: 1008px) 280px, 400px',
    src: `https://ichef.bbci.co.uk/news/400${url}`,
    smallSrc: `https://ichef.bbci.co.uk/news/240${url}`,
    alt: altText,
    width,
    height,
    copyright,
  };
};

const cpsPromoFormatter = props => ({
  children: path(['item', 'headlines', 'headline'], props),
  footer: (
    <TimestampFooter
      timestamp={path(['item', 'timestamp'], props)}
      serviceDatetimeLocale={path(['item', 'serviceDatetimeLocale'], props)}
    />
  ),
  url: path(['item', 'locators', 'assetUri'], props),
  image: buildImageProperties(path(['item', 'indexImage'], props)),
  eventTrackingData: path(['eventTrackingData', 'block'], props),
});

const linkPromoFormatter = props => ({
  children: path(['item', 'name'], props),
  footer: (
    <TimestampFooter
      timestamp={path(['item', 'timestamp'], props)}
      serviceDatetimeLocale={path(['item', 'serviceDatetimeLocale'], props)}
    />
  ),
  url: path(['item', 'uri'], props),
  image: buildImageProperties(path(['item', 'indexImage'], props)),
  eventTrackingData: path(['eventTrackingData', 'block'], props),
});

const normalise = props => {
  if (hasPath(['item', 'cpsType'], props)) return cpsPromoFormatter(props);
  if (path(['item', 'assetTypeCode'], props) === 'PRO')
    return linkPromoFormatter(props);
  return props;
};

const validate = props => {
  try {
    return [props.children, props.image, props.url].every(Boolean);
  } catch (e) {
    return false;
  }
};

const withData = Component => props => {
  const data = normalise(props);
  if (!validate(data)) {
    return null;
  }
  return <Component {...data} />;
};

export default withData;
