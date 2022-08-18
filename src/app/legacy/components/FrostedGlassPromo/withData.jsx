import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import path from 'ramda/src/path';
import hasPath from 'ramda/src/hasPath';
import pick from 'ramda/src/pick';

import { createSrcsets } from '#lib/utilities/srcSet';
import getOriginCode from '#lib/utilities/imageSrcHelpers/originCode';
import getLocator from '#lib/utilities/imageSrcHelpers/locator';
import buildIChefURL from '#lib/utilities/ichefURL';

import TimestampFooter from './TimestampFooter';

const buildImageProperties = image => {
  if (!image) return null;
  const { width, height, altText, path: url, copyright } = image;
  const originCode = getOriginCode(url);
  const locator = getLocator(url);

  const { primarySrcset, primaryMimeType, fallbackSrcset, fallbackMimeType } =
    createSrcsets({
      originCode,
      locator,
      originalImageWidth: width,
      imageResolutions: [400],
    });

  const src = buildIChefURL({
    originCode,
    locator,
    resolution: 400,
    isWebP: true,
  });

  return {
    ratio: 52,
    srcset: primarySrcset,
    fallbackSrcset,
    sizes: '(min-width: 1008px) 400px',
    src,
    primaryMimeType,
    fallbackMimeType,
    alt: altText,
    width,
    height,
    copyright,
  };
};

const TimestampFooterWithAmp = props => {
  const { isAmp } = useContext(RequestContext);
  return (
    <TimestampFooter
      serviceDatetimeLocale={path(['item', 'serviceDatetimeLocale'], props)}
      isAmp={isAmp}
    >
      {path(['item', 'timestamp'], props)}
    </TimestampFooter>
  );
};

const cpsPromoFormatter = props => ({
  children: path(['item', 'headlines', 'headline'], props),
  footer: <TimestampFooterWithAmp {...props} />,
  url: path(['item', 'locators', 'assetUri'], props),
  image: buildImageProperties(path(['item', 'indexImage'], props)),
  eventTrackingData: path(['eventTrackingData', 'block'], props),
});

const linkPromoFormatter = props => ({
  children: path(['item', 'name'], props),
  footer: <TimestampFooterWithAmp {...props} />,
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

const withData =
  (Component, propsToPassThrough = []) =>
  props => {
    const data = normalise(props);
    const additionalProps = pick(propsToPassThrough, props);
    if (!validate(data)) {
      return null;
    }
    return <Component {...data} {...additionalProps} />;
  };

export default withData;
