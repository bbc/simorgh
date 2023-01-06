import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import { shape, bool, oneOfType } from 'prop-types';
import Bulletin from '#psammead/psammead-bulletin/src';
import { createSrcsets } from '#lib/utilities/srcSet';
import buildIChefURL from '#lib/utilities/ichefURL';
import getOriginCode from '#lib/utilities/imageSrcHelpers/originCode';
import getLocator from '#lib/utilities/imageSrcHelpers/locator';
import { tvBulletinItem, radioBulletinItem } from '#models/propTypes/bulletin';
import { ServiceContext } from '../../../contexts/ServiceContext';
import ImageWithPlaceholder from '../ImageWithPlaceholder';

const BulletinImage = ({ imageValues, lazyLoad }) => {
  const { path, height, width, altText, copyrightHolder } = imageValues;

  const ratio = (height / width) * 100;
  const originCode = getOriginCode(path);
  const locator = getLocator(path);
  const imageResolutions = [70, 95, 144, 183, 240, 320, 660];
  const { primarySrcset, primaryMimeType, fallbackSrcset, fallbackMimeType } =
    createSrcsets({
      originCode,
      locator,
      originalImageWidth: width,
      imageResolutions,
    });
  const sizes =
    '(min-width: 1100px) 496px, (min-width: 600px) 45.83vw, 94.29vw';
  const DEFAULT_IMAGE_RES = 660;
  const src = buildIChefURL({
    originCode,
    locator,
    resolution: DEFAULT_IMAGE_RES,
  });

  return (
    <ImageWithPlaceholder
      alt={altText}
      ratio={ratio}
      src={src}
      fallback={false}
      {...imageValues}
      lazyLoad={lazyLoad}
      copyright={copyrightHolder}
      srcset={primarySrcset}
      fallbackSrcset={fallbackSrcset}
      primaryMimeType={primaryMimeType}
      fallbackMimeType={fallbackMimeType}
      sizes={sizes}
    />
  );
};

BulletinImage.propTypes = {
  lazyLoad: bool,
  imageValues: oneOfType([
    tvBulletinItem.indexImage,
    radioBulletinItem.indexImage,
  ]),
};

BulletinImage.defaultProps = {
  lazyLoad: false,
  imageValues: shape({
    path: '',
    height: '',
    width: '',
    altText: '',
    copyrightHolder: '',
  }),
};

const BulletinContainer = ({ item, lazyLoadImage }) => {
  const { script, service, dir, translations } = useContext(ServiceContext);

  const headline = pathOr(null, ['name'], item);
  const ctaLink = pathOr(null, ['uri'], item);
  const allyLink = ctaLink.split('/').pop();

  if (!headline || !ctaLink) {
    return null;
  }

  const summary = pathOr(null, ['summary'], item);

  const imageValues = pathOr(null, ['indexImage'], item);
  const Image = imageValues && (
    <BulletinImage lazyLoad={lazyLoadImage} imageValues={imageValues} />
  );

  const contentType = pathOr(null, ['contentType'], item);
  const mediaType = contentType === 'TVBulletin' ? 'video' : 'audio';

  const watchText = pathOr('Watch', ['media', 'watch'], translations);
  const listenText = pathOr('Listen', ['media', 'listen'], translations);
  const liveText = pathOr('LIVE', ['media', 'liveLabel'], translations);
  const ctaText = contentType === 'TVBulletin' ? watchText : listenText;
  const ctaTextIsEnglish = ctaText === 'Watch' || ctaText === 'Listen';

  const isLive = pathOr(null, ['isLive'], item);

  // This offscreen text should come from a fully translated string.
  // https://github.com/bbc/simorgh/issues/5626
  const offScreenText = isLive ? `${ctaText} Live` : ctaText;
  return (
    <Bulletin
      script={script}
      service={service}
      dir={dir}
      image={Image}
      mediaType={mediaType}
      headlineText={headline}
      summaryText={summary}
      ctaLink={ctaLink}
      ctaText={ctaText}
      isLive={isLive}
      liveText={liveText}
      offScreenText={offScreenText}
      lang={ctaTextIsEnglish ? 'en-GB' : null}
      ariaId={`${headline}${allyLink}`}
    />
  );
};

BulletinContainer.propTypes = {
  item: oneOfType([shape(tvBulletinItem), shape(radioBulletinItem)]).isRequired,
  lazyLoadImage: bool,
};

BulletinContainer.defaultProps = {
  lazyLoadImage: true,
};

export default BulletinContainer;
