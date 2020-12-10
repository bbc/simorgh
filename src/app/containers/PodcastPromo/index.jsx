import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import { string } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
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
  const { translations, podcastPromo, script, service } = useContext(
    ServiceContext,
  );
  const episodesTranslation = pathOr('Episodes', ['episodes'], translations);
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
      <PodcastPromo script={script} service={service} role="region">
        <PodcastPromo.Title>{title}</PodcastPromo.Title>
        <PodcastPromo.Card>
          <PodcastPromo.Card.Image>
            <ImageWithPlaceholder
              src={img}
              alt={alt}
              width={88}
              ratio={100}
              lazyLoad
            />
          </PodcastPromo.Card.Image>
          <PodcastPromo.Card.Content>
            <PodcastPromo.Card.Title>
              <PodcastPromo.Card.Link href={url}>
                <span className="podcast-promo--hover podcast-promo--focus podcast-promo--visited">
                  {label}
                </span>
                <VisuallyHiddenText>, {episodesTranslation}</VisuallyHiddenText>
              </PodcastPromo.Card.Link>
            </PodcastPromo.Card.Title>
            <PodcastPromo.Card.Description>
              {description}
            </PodcastPromo.Card.Description>
            <PodcastPromo.Card.CallToAction>
              {label}
            </PodcastPromo.Card.CallToAction>
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
