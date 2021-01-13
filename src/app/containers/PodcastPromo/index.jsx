import React, { useContext } from 'react';
import path from 'ramda/src/path';
import { string } from 'prop-types';
import PodcastPromo from '@bbc/psammead-podcast-promo';

import { ServiceContext } from '#contexts/ServiceContext';
import ImageWithPlaceholder from '#containers/ImageWithPlaceholder';

const Promo = ({
  title,
  brandTitle,
  brandDescription,
  imageSrc,
  imageAlt,
  linkHref,
  linkText,
}) => {
  const { podcastPromo, script, service } = useContext(ServiceContext);
  const podcastPromoTitle = title || path(['title'], podcastPromo);
  const podcastBrandTitle = brandTitle || path(['brandTitle'], podcastPromo);
  const description =
    brandDescription || path(['brandDescription'], podcastPromo);
  const img = imageSrc || path(['image', 'src'], podcastPromo);
  const alt = imageAlt || path(['image', 'alt'], podcastPromo);
  const url = linkHref || path(['linkLabel', 'href'], podcastPromo);
  const label = linkText || path(['linkLabel', 'text'], podcastPromo);

  const showPromo = [
    podcastBrandTitle,
    podcastPromoTitle,
    description,
    img,
    alt,
    url,
    label,
  ].every(Boolean);
  if (!showPromo) {
    return null;
  }

  return (
    <div>
      <PodcastPromo
        script={script}
        service={service}
        role="region"
        aria-labelledby="podcast-promo"
      >
        <PodcastPromo.Title id="podcast-promo">
          {podcastPromoTitle}
        </PodcastPromo.Title>
        <PodcastPromo.Card>
          <PodcastPromo.Card.ImageWrapper>
            <ImageWithPlaceholder
              src={img}
              alt={alt}
              height={88}
              width={88}
              ratio={100}
              lazyLoad
            />
          </PodcastPromo.Card.ImageWrapper>
          <PodcastPromo.Card.Content>
            <PodcastPromo.Card.Title>
              <PodcastPromo.Card.Link href={url}>
                <span className="podcast-promo--hover podcast-promo--focus podcast-promo--visited">
                  {podcastBrandTitle}
                </span>
              </PodcastPromo.Card.Link>
            </PodcastPromo.Card.Title>
            <PodcastPromo.Card.Description>
              {description}
            </PodcastPromo.Card.Description>
            <PodcastPromo.Card.EpisodesText>
              {label}
            </PodcastPromo.Card.EpisodesText>
          </PodcastPromo.Card.Content>
        </PodcastPromo.Card>
      </PodcastPromo>
    </div>
  );
};

Promo.propTypes = {
  title: string,
  brandTitle: string,
  brandDescription: string,
  imageSrc: string,
  imageAlt: string,
  linkHref: string,
  linkText: string,
};

Promo.defaultProps = {
  title: null,
  brandTitle: null,
  brandDescription: null,
  imageSrc: null,
  imageAlt: null,
  linkHref: null,
  linkText: null,
};

export default Promo;
