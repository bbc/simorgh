import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import { shape, oneOfType } from 'prop-types';
import Image from '@bbc/psammead-image';
import Bulletin from '@bbc/psammead-bulletin';
import { tvBulletinItem, radioBulletinItem } from '#models/propTypes/bulletin';
import { ServiceContext } from '#contexts/ServiceContext';

const BulletinContainer = ({ item }) => {
  const { script, service, dir, translations } = useContext(ServiceContext);

  const headline = pathOr(null, ['name'], item);
  const ctaLink = pathOr(null, ['uri'], item);

  if (!headline || !ctaLink) {
    return null;
  }

  const summary = pathOr(null, ['summary'], item);
  const imageSrc = pathOr(null, ['indexImage', 'href'], item);
  const imageAlt = pathOr(null, ['indexImage', 'altText'], item);
  const bulletinImage = <Image src={imageSrc} alt={imageAlt} />;

  const contentType = pathOr(null, ['contentType'], item);
  const type = contentType === 'TVBulletin' ? 'video' : 'audio';

  const watchText = pathOr('Watch', ['media', 'watch'], translations);
  const listenText = pathOr('Listen', ['media', 'listen'], translations);
  const ctaText = contentType === 'TVBulletin' ? watchText : listenText;

  const isLive = pathOr(null, ['isLive'], item);
  const playCtaText = isLive ? `${ctaText} Live` : ctaText;
  const offScreenText = isLive ? `${ctaText} LIVE` : ctaText;

  return (
    <Bulletin
      image={imageSrc && bulletinImage}
      type={type}
      isLive={isLive}
      script={script}
      service={service}
      headlineText={headline}
      summaryText={summary}
      ctaLink={ctaLink}
      ctaText={playCtaText}
      offScreenText={offScreenText}
      dir={dir}
    />
  );
};

BulletinContainer.propTypes = {
  item: oneOfType([shape(tvBulletinItem), shape(radioBulletinItem)]).isRequired,
};

export default BulletinContainer;
