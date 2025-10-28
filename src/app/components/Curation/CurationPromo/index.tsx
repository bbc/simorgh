/* eslint-disable jsx-a11y/aria-role */
import { use } from 'react';
import moment from 'moment';
import path from 'ramda/src/path';
import formatDuration from '#app/lib/utilities/formatDuration';
import Promo from '#components/Promo';
import { Summary } from '#app/models/types/curationData';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import isMediaType from '#app/lib/utilities/isMedia';
import VisuallyHiddenText from '../../VisuallyHiddenText';
import { ServiceContext } from '../../../contexts/ServiceContext';
import { RequestContext } from '../../../contexts/RequestContext';

import LiveLabel from '../../LiveLabel';

import styles from './index.styles';

const CurationPromo = ({
  id,
  title,
  lastPublished,
  imageUrl,
  imageAlt,
  lazy,
  link,
  type,
  duration: mediaDuration,
  headingLevel = 2,
  isLive,
  eventTrackingData,
  timeOfDayExperimentName,
  timeOfDayVariant,
}: Summary) => {
  const { isAmp, isLite } = use(RequestContext);
  const { translations } = use(ServiceContext);

  const audioTranslation = path(['media', 'audio'], translations);
  const videoTranslation = path(['media', 'video'], translations);
  const photoGalleryTranslation = path(['media', 'photogallery'], translations);
  const durationTranslation = path(['media', 'duration'], translations);
  const duration = moment.duration(mediaDuration, 'seconds');

  const separator = ',';

  const formattedDuration = formatDuration({ duration, separator });
  const durationString = `, ${durationTranslation} ${formattedDuration}`;

  const showDuration = mediaDuration && ['video', 'audio'].includes(type);
  const isMedia = isMediaType(type);
  const typeTranslated =
    (type === 'audio' && `${audioTranslation}, `) ||
    (type === 'video' && `${videoTranslation}, `) ||
    (type === 'photogallery' && `${photoGalleryTranslation}, `);

  const clickTrackerHandler = useClickTrackerHandler({
    ...eventTrackingData,
    ...(timeOfDayVariant && {
      sendOptimizelyEvents: true,
      experimentName: timeOfDayExperimentName,
      experimentVariant: timeOfDayVariant,
    }),
  });

  return (
    <Promo css={styles.promo} className="">
      {imageUrl && (
        <Promo.Image
          src={imageUrl}
          alt={imageAlt}
          lazyLoad={lazy}
          isAmp={isAmp}
          {...(isLite && { css: styles.image })}
        >
          {isMedia && (
            <Promo.MediaIcon css={styles.icon} type={type}>
              {showDuration ? mediaDuration : ''}
            </Promo.MediaIcon>
          )}
        </Promo.Image>
      )}
      <Promo.Heading as={`h${headingLevel}`}>
        {isMedia ? (
          <Promo.A href={link} aria-labelledby={id} {...clickTrackerHandler}>
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
          <Promo.A href={link} {...clickTrackerHandler}>
            {isLive ? <LiveLabel>{title}</LiveLabel> : title}
          </Promo.A>
        )}
      </Promo.Heading>
      {!isLive ? (
        <Promo.Timestamp className="promo-timestamp">
          {lastPublished}
        </Promo.Timestamp>
      ) : null}
    </Promo>
  );
};

export default CurationPromo;
