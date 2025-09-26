/* eslint-disable jsx-a11y/aria-role */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { use } from 'react';
import moment from 'moment';
import path from 'ramda/src/path';
import formatDuration from '#app/lib/utilities/formatDuration';
import Promo from '#components/Promo';
import { Summary } from '#app/models/types/curationData';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import isMediaType from '#app/lib/utilities/isMedia';
import { ReadTime } from '#app/components/ReadTime';
import VisuallyHiddenText from '../../VisuallyHiddenText';
import { ServiceContext } from '../../../contexts/ServiceContext';
import { RequestContext } from '../../../contexts/RequestContext';

import LiveLabel from '../../LiveLabel';

import styles from './index.styles';
import { extractId } from '#app/pages/HomePage/HomePage';

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
  readTime,
  eventTrackingData,
  readTimeVariant,
  mostReadItemId,
  position,
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
    sendOptimizelyEvents: true,
    experimentName: 'newswb_ws_homepage_read_time',
    experimentVariant: readTimeVariant,
  });

  const getPromoItemId = extractId(id) ?? null;
  const isMostReadStory = mostReadItemId && getPromoItemId === mostReadItemId;

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
            {isMostReadStory ? <div>Most Read</div> : null}
            {isLive ? <LiveLabel>{title}</LiveLabel> : title}
          </Promo.A>
        )}
      </Promo.Heading>
      {!isLive ? (
        <Promo.Timestamp className="promo-timestamp" showPrefix>
          {lastPublished}
        </Promo.Timestamp>
      ) : null}
      {/* EXPERIMENT: Read Time */}
      <ReadTime
        readTimeValue={readTime}
        promoId={id}
        promoType={type}
        promoPosition={position}
        readTimeVariant={readTimeVariant}
      />
    </Promo>
  );
};

export default CurationPromo;
