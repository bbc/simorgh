/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PropsWithChildren, useContext } from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import pick from 'ramda/src/pick';

import PromoTimestamp from '../../legacy/components/Promo/timestamp';
import getOriginCode from '../../lib/utilities/imageSrcHelpers/originCode';
import getLocator from '../../lib/utilities/imageSrcHelpers/locator';
import buildIChefURL from '../../lib/utilities/ichefURL';

import { createSrcsets } from '../../lib/utilities/srcSet';
import { RequestContext } from '../../contexts/RequestContext';

import styles from './styles';
import { FormattedPromo, ImageProps, PromoProps } from './types';
import { OptimoBlock } from '../../models/types/optimo';

const defaultImageProps = {
  height: null,
  width: 400,
  altText: '',
  path: '/cpsprodpb/36D1/production/_127933041__63970643_bbc-news-world-service-logo-nc.png',
  locator: null,
  originCode: null,
  copyright: null,
};

const buildImageProperties = (imageProps?: ImageProps) => {
  const image =
    imageProps?.path || imageProps?.locator ? imageProps : defaultImageProps;

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
  });

  return {
    ratio: 52,
    srcSet: primarySrcset,
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

  if (!props?.item?.timestamp) return null;

  return (
    <PromoTimestamp
      css={theme => [
        styles.timestamp,
        {
          color: isAmp ? theme.palette.BLACK : theme.palette.GREY_3,
        },
      ]}
      serviceDatetimeLocale={props?.item?.serviceDatetimeLocale}
    >
      {props?.item?.timestamp}
    </PromoTimestamp>
  );
};

const optimoPromoFormatter = (props: PromoProps): FormattedPromo => {
  const defaultPromoImage = pathOr<OptimoBlock[]>(
    [],
    ['item', 'images', 'defaultPromoImage', 'blocks'],
    props,
  );

  const altText: string = defaultPromoImage?.find(
    block => block.type === 'altText',
    // @ts-expect-error - Optimo nested block structure
  )?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.text;

  // @ts-expect-error - We don't have types for specific Optimo blocks yet
  const imageMetadata: ImageProps = defaultPromoImage.find(
    block => block.type === 'rawImage',
  )?.model;

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
    url: props?.item?.locators?.canonicalUrl,
    image: buildImageProperties({
      ...imageMetadata,
      altText,
      copyright: imageMetadata?.copyrightHolder,
    }),
    eventTrackingData: props?.eventTrackingData?.block,
  };
};

const cpsPromoFormatter = (props: PromoProps): FormattedPromo => ({
  children: props?.item?.headlines?.headline,
  footer: <TimestampFooterWithAmp {...props} />,
  url: props?.item?.locators?.assetUri,
  image: buildImageProperties(props?.item?.indexImage),
  eventTrackingData: props?.eventTrackingData?.block,
});

const linkPromoFormatter = (props: PromoProps): FormattedPromo => ({
  children: props?.item?.name,
  footer: <TimestampFooterWithAmp {...props} />,
  url: props?.item?.uri,
  image: buildImageProperties(props?.item?.indexImage),
  eventTrackingData: props?.eventTrackingData?.block,
});

const normalise = (props: PromoProps): FormattedPromo => {
  if (props.item?.type === 'optimo') return optimoPromoFormatter(props);
  if (props.item?.cpsType || props.item?.type === 'cps')
    return cpsPromoFormatter(props);
  if (props.item?.assetTypeCode === 'PRO') return linkPromoFormatter(props);
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
  (
    Component: React.ElementType,
    propsToPassThrough: (keyof PromoProps | 'children')[] = [],
  ) =>
  (props: PropsWithChildren<PromoProps>) => {
    const data = normalise(props);
    const additionalProps = pick(propsToPassThrough, props);
    if (!validate(data)) {
      return null;
    }
    return <Component {...data} {...additionalProps} />;
  };

export default withData;
