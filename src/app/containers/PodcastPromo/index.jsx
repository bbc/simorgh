import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import { string } from 'prop-types';
import PodcastPromo from '@bbc/psammead-podcast-promo';

import { ServiceContext } from '#contexts/ServiceContext';
import ImageWithPlaceholder from '#containers/ImageWithPlaceholder';

const Promo = ({
  brandTitle,
  brandDescription,
  imageSrc,
  imageAlt,
  linkHref,
  linkText,
}) => {
  const { podcastPromo, script, service } = useContext(ServiceContext);
  const title = brandTitle || pathOr('', ['brandTitle'], podcastPromo);
  const description =
    brandDescription || pathOr('', ['brandDescription'], podcastPromo);
  const img = imageSrc || pathOr('', ['imageSrc'], podcastPromo);
  const alt = imageAlt || pathOr('', ['imageAlt'], podcastPromo);
  const url = linkHref || pathOr('', ['linkHref'], podcastPromo);
  const label = linkText || pathOr('', ['linkText'], podcastPromo);

  const showPromo = title && description && img && alt && url && label;
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
        <PodcastPromo.Title id="podcast-promo">{title}</PodcastPromo.Title>
        <PodcastPromo.Card>
          <PodcastPromo.Card.ImageWrapper>
            <ImageWithPlaceholder
              src={img}
              alt={alt}
              width={88}
              ratio={100}
              lazyLoad
            />
          </PodcastPromo.Card.ImageWrapper>
          <PodcastPromo.Card.Content>
            <PodcastPromo.Card.Title>
              <PodcastPromo.Card.Link href={url}>
                <span className="podcast-promo--hover podcast-promo--focus podcast-promo--visited">
                  {label}
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
  brandTitle: string,
  brandDescription: string,
  imageSrc: string,
  imageAlt: string,
  linkHref: string,
  linkText: string,
};

Promo.defaultProps = {
  brandTitle: '',
  brandDescription: '',
  imageSrc: '',
  imageAlt: '',
  linkHref: '',
  linkText: '',
};

export default Promo;
