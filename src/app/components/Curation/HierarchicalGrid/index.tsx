/* eslint-disable jsx-a11y/aria-role */
/** @jsx jsx */
import { useContext } from 'react';
import { css, jsx, Theme } from '@emotion/react';
import moment from 'moment';
import path from 'ramda/src/path';
import VisuallyHiddenText from '../../VisuallyHiddenText';
import formatDuration from '../../../lib/utilities/formatDuration';
import Promo from '../../../legacy/components/Promo';
import { DESKTOP, TABLET, MOBILE, SMALL } from './dataStructures';
import { styles } from './index.styles';
import { ServiceContext } from '../../../contexts/ServiceContext';
import { CurationGridProps } from '../types';
import { RequestContext } from '../../../contexts/RequestContext';
import LiveLabel from '../../LiveLabel';

const getStyles = (promoCount: number, i: number, mq: Theme['mq']) => {
  return css({
    [mq.GROUP_1_MAX_WIDTH]: {
      ...SMALL[promoCount - 1][i],
    },
    [mq.GROUP_2_ONLY]: {
      ...MOBILE[promoCount - 1][i],
    },
    [mq.GROUP_3_ONLY]: {
      ...TABLET[promoCount - 1][i],
    },
    [mq.GROUP_4_MIN_WIDTH]: {
      ...DESKTOP[promoCount - 1][i],
    },
  });
};

const HiearchicalGrid = ({
  summaries,
  headingLevel,
  isFirstCuration,
}: CurationGridProps) => {
  const { isAmp } = useContext(RequestContext);
  const { translations } = useContext(ServiceContext);

  const audioTranslation = path(['media', 'audio'], translations);
  const videoTranslation = path(['media', 'video'], translations);
  const photoGalleryTranslation = path(['media', 'photogallery'], translations);
  const durationTranslation = path(['media', 'duration'], translations);
  if (!summaries || summaries.length < 3) return null;

  const promoItems = summaries.slice(0, 12);
  return (
    <div data-testid="hierarchical-grid">
      <ul role="list" css={styles.list} data-testid="topic-promos">
        {promoItems.map((promo, i) => {
          const duration = moment.duration(promo.duration, 'seconds');
          const separator = ',';
          const formattedDuration = formatDuration({ duration, separator });
          const durationString = `, ${durationTranslation} ${formattedDuration}`;

          const useLargeImages = i === 0 && promoItems.length >= 3;

          const isFirstPromo = i === 0;

          const lazyLoadImages = !(isFirstPromo && isFirstCuration);

          const fetchpriority =
            isFirstPromo && isFirstCuration ? 'high' : undefined;

          const showDuration =
            promo.duration && ['video', 'audio'].includes(promo.type);
          const isMedia = ['video', 'audio', 'photogallery'].includes(
            promo.type,
          );
          const typeTranslated =
            (promo.type === 'audio' && `${audioTranslation}, `) ||
            (promo.type === 'video' && `${videoTranslation}, `) ||
            (promo.type === 'photogallery' && `${photoGalleryTranslation}, `);

          const { isLive } = promo;

          return (
            <li
              key={promo.id}
              css={({ mq }: Theme) => [
                styles.item,
                getStyles(promoItems.length, i, mq),
              ]}
            >
              <Promo className="">
                <Promo.Image
                  useLargeImages={useLargeImages}
                  src={promo.imageUrl || null}
                  alt={promo.imageAlt}
                  lazyLoad={lazyLoadImages}
                  fetchPriority={fetchpriority}
                  isAmp={isAmp}
                >
                  {isMedia && (
                    <Promo.MediaIcon type={promo.type}>
                      {showDuration ? promo.duration : ''}
                    </Promo.MediaIcon>
                  )}
                </Promo.Image>
                <Promo.Heading
                  as={`h${headingLevel}`}
                  css={(theme: Theme) => ({
                    color: theme.palette.GREY_10,
                    ...(i === 0 && theme.fontSizes.paragon),
                  })}
                >
                  {isMedia ? (
                    <Promo.A href={promo.link} aria-labelledby={promo.id}>
                      <span id={promo.id} role="text">
                        <VisuallyHiddenText data-testid="visually-hidden-text">
                          {typeTranslated}
                        </VisuallyHiddenText>
                        {promo.title}
                        {showDuration && (
                          <VisuallyHiddenText>
                            {durationString}
                          </VisuallyHiddenText>
                        )}
                      </span>
                    </Promo.A>
                  ) : (
                    <Promo.A href={promo.link}>
                      {isLive ? (
                        <LiveLabel
                          {...(isFirstPromo
                            ? {
                                className: 'first-promo',
                              }
                            : undefined)}
                        >
                          {promo.title}
                        </LiveLabel>
                      ) : (
                        promo.title
                      )}
                    </Promo.A>
                  )}
                </Promo.Heading>
                <Promo.Body className="promo-paragraph" css={styles.body}>
                  {promo.description}
                </Promo.Body>
                {!isLive ? (
                  <Promo.Timestamp className="promo-timestamp">
                    {promo.lastPublished}
                  </Promo.Timestamp>
                ) : null}
              </Promo>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HiearchicalGrid;
