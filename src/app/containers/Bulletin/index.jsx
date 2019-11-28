import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import { shape, oneOfType } from 'prop-types';
import Image from '@bbc/psammead-image';
import Bulletin from '@bbc/psammead-bulletin';
import { tvBulletinItem, radioBulletinItem } from '#models/propTypes/bulletin';
import { ServiceContext } from '#contexts/ServiceContext';

// eslint-disable-next-line react/prop-types
const BulletinContainer = ({ item }) => {
  const { script, service, dir } = useContext(ServiceContext);

  const contentType = pathOr(null, ['contentType'], item);
  const isLive = pathOr(null, ['isLive'], item);
  const headline = pathOr(null, ['name'], item);
  const summary = pathOr(null, ['summary'], item);
  const ctaLink = pathOr(null, ['uri'], item);
  const imageSrc = pathOr(null, ['indexImage', 'href'], item);
  const imageAlt = pathOr(null, ['indexImage', 'altText'], item);
  const bulletinImage = <Image src={imageSrc} alt={imageAlt} />;

  let ctaText;
  let type;
  if (contentType === 'TVBulletin') {
    type = 'video';
    ctaText = 'Watch';
  } else {
    type = 'audio';
    ctaText = 'Listen';
  }

  if (!headline || !ctaLink) {
    return null;
  }

  return (
    <Bulletin
      image={bulletinImage}
      type={type}
      isLive={isLive}
      script={script}
      service={service}
      headlineText={headline}
      summaryText={summary}
      ctaLink={ctaLink}
      ctaText={ctaText}
      dir={dir}
    />
  );
};

BulletinContainer.propTypes = {
  item: oneOfType([shape(tvBulletinItem), shape(radioBulletinItem)]).isRequired,
};

export default BulletinContainer;
