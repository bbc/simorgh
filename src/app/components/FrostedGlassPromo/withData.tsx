/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PropsWithChildren, useContext } from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import hasPath from 'ramda/src/hasPath';
import pick from 'ramda/src/pick';

import PromoTimestamp from '../../legacy/components/Promo/timestamp';
import getOriginCode from '../../lib/utilities/imageSrcHelpers/originCode';
import getLocator from '../../lib/utilities/imageSrcHelpers/locator';
import buildIChefURL from '../../lib/utilities/ichefURL';

import { createSrcsets } from '../../lib/utilities/srcSet';
import { RequestContext } from '../../contexts/RequestContext';

import styles from './styles';
import { FormattedPromo, ImageProps, PromoProps } from './types';

const buildImageProperties = (image?: ImageProps) => {
  if (!image) return null;
  const {
    width,
    height,
    altText,
    path: url,
    locator: optimoLocator,
    originCode: optimoOriginCode,
    copyright,
  } = image;
  const originCode = optimoOriginCode || getOriginCode(url);
  const locator = optimoLocator || getLocator(url);

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

const TimestampFooterWithAmp = (props: PromoProps) => {
  const { isAmp } = useContext(RequestContext);
  return (
    <PromoTimestamp
      css={theme => [
        styles.timestamp,
        {
          color: isAmp ? theme.palette.BLACK : theme.palette.GREY_3,
        },
      ]}
      serviceDatetimeLocale={path<string>(
        ['item', 'serviceDatetimeLocale'],
        props,
      )}
    >
      {pathOr<string>('', ['item', 'timestamp'], props)}
    </PromoTimestamp>
  );
};

const optimoPromoFormatter = (props: PromoProps): FormattedPromo => {
  const altText = pathOr<string>(
    '',
    [
      'item',
      'images',
      'defaultPromoImage',
      'blocks',
      0,
      'model',
      'blocks',
      0,
      'model',
      'blocks',
      0,
      'model',
      'text',
    ],
    props,
  );

  const imageProps = path<ImageProps>(
    ['item', 'images', 'defaultPromoImage', 'blocks', 1, 'model'],
    props,
  );

  return {
    children: path<string>(
      [
        'item',
        'headlines',
        'promoHeadline',
        'blocks',
        0,
        'model',
        'blocks',
        0,
        'model',
        'text',
      ],
      props,
    ),
    footer: <TimestampFooterWithAmp {...props} />,
    url: path(['item', 'locators', 'canonicalUrl'], props),
    image: buildImageProperties({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ...imageProps!,
      altText,
      copyright: imageProps?.copyrightHolder,
    }),
    eventTrackingData: path(['eventTrackingData', 'block'], props),
  };
};

const cpsPromoFormatter = (props: PromoProps): FormattedPromo => ({
  children: path(['item', 'headlines', 'headline'], props),
  footer: <TimestampFooterWithAmp {...props} />,
  url: path(['item', 'locators', 'assetUri'], props),
  image: buildImageProperties(path(['item', 'indexImage'], props)),
  eventTrackingData: path(['eventTrackingData', 'block'], props),
});

const linkPromoFormatter = (props: PromoProps): FormattedPromo => ({
  children: path(['item', 'name'], props),
  footer: <TimestampFooterWithAmp {...props} />,
  url: path(['item', 'uri'], props),
  image: buildImageProperties(path(['item', 'indexImage'], props)),
  eventTrackingData: path(['eventTrackingData', 'block'], props),
});

const normalise = (props: PromoProps): FormattedPromo => {
  if (path(['item', 'type'], props) === 'optimo')
    return optimoPromoFormatter(props);
  if (hasPath(['item', 'cpsType'], props)) return cpsPromoFormatter(props);
  if (path(['item', 'assetTypeCode'], props) === 'PRO')
    return linkPromoFormatter(props);
  return props as unknown as FormattedPromo;
};

const validate = (props: FormattedPromo) => {
  try {
    return [props.children, props.image, props.url].every(Boolean);
  } catch (e) {
    return false;
  }
};

const withData =
  (Component: React.ElementType, propsToPassThrough: string[] = []) =>
  (props: PropsWithChildren<PromoProps>) => {
    const data = normalise(props);
    const additionalProps = pick(propsToPassThrough, props);
    if (!validate(data)) {
      return null;
    }
    return <Component {...data} {...additionalProps} />;
  };

export default withData;
