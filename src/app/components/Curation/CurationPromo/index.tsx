/* eslint-disable jsx-a11y/aria-role */
import React, { useContext } from 'react';
import moment from 'moment';
import path from 'ramda/src/path';
import VisuallyHiddenText from '#psammead/psammead-visually-hidden-text/src';
import formatDuration from '#app/lib/utilities/formatDuration';
import Promo from '#components/Promo';
import { ServiceContext } from '../../../contexts/ServiceContext';
import { Promo as CurationPromoProps } from '../types';

const CurationPromo = ({
  id,
  title,
  firstPublished,
  imageUrl,
  imageAlt,
  lazy,
  link,
  type,
  duration: mediaDuration,
  headingLevel = 2,
}: CurationPromoProps) => {
  const { translations } = useContext(ServiceContext);

  const audioTranslation = path(['media', 'audio'], translations);
  const videoTranslation = path(['media', 'video'], translations);
  const photoGalleryTranslation = path(['media', 'photogallery'], translations);
  const durationTranslation = path(['media', 'duration'], translations);
  const duration = moment.duration(mediaDuration, 'seconds');

  const separator = ',';

  const formattedDuration = formatDuration({ duration, separator });
  const durationString = `${durationTranslation}, ${formattedDuration}`;

  const showDuration = mediaDuration && ['video', 'audio'].includes(type);
  const isMedia = ['video', 'audio', 'photogallery'].includes(type);
  const typeTranslated =
    (type === 'audio' && `${audioTranslation}, `) ||
    (type === 'video' && `${videoTranslation}, `) ||
    (type === 'photogallery' && `${photoGalleryTranslation}, `);

  return (
    <Promo>
      <Promo.Image src={imageUrl} alt={imageAlt} lazyLoad={lazy}>
        <Promo.MediaIcon type={type}>
          {showDuration ? mediaDuration : ''}
        </Promo.MediaIcon>
      </Promo.Image>
      <Promo.Heading as={`h${headingLevel}`}>
        {isMedia ? (
          <Promo.A
            href={link}
            aria-labelledby={id}
            className="focusIndicatorDisplayBlock"
          >
            <span id={id} role="text">
              <VisuallyHiddenText data-testid="visually-hidden-text">
                {typeTranslated}
              </VisuallyHiddenText>
              {title}
              {showDuration && (
                <VisuallyHiddenText>{durationString}</VisuallyHiddenText>
              )}
            </span>
          </Promo.A>
        ) : (
          <Promo.A href={link} className="focusIndicatorDisplayBlock">
            {title}
          </Promo.A>
        )}
      </Promo.Heading>
      <Promo.Timestamp>{firstPublished}</Promo.Timestamp>
    </Promo>
  );
};

export default CurationPromo;
