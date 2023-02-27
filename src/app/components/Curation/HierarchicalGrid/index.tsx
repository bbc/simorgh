/* eslint-disable jsx-a11y/aria-role */
/** @jsx jsx */
import { useContext } from 'react';
import { css, jsx, Theme } from '@emotion/react';
import moment from 'moment';
import path from 'ramda/src/path';
import VisuallyHiddenText from '../../../legacy/psammead/psammead-visually-hidden-text/src';
import formatDuration from '../../../lib/utilities/formatDuration';
import Promo from '../../../legacy/components/Promo';
import { DESKTOP, TABLET, MOBILE, SMALL } from './dataStructures';
import { styles } from './index.styles';
import { ServiceContext } from '../../../contexts/ServiceContext';
import { CurationGridProps } from '../types';

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

const HiearchicalGrid = ({ promos, headingLevel }: CurationGridProps) => {
  const { translations } = useContext(ServiceContext);

  const audioTranslation = path(['media', 'audio'], translations);
  const videoTranslation = path(['media', 'video'], translations);
  const photoGalleryTranslation = path(['media', 'photogallery'], translations);
  const durationTranslation = path(['media', 'duration'], translations);
  if (!promos || promos.length < 3) return null;

  const promoItems = promos.slice(0, 12);
  return (
    <div data-testid="hierarchical-grid">
      <ul role="list" css={styles.list} data-testid="topic-promos">
        {promoItems.map((promo, i) => {
          const duration = moment.duration(promo.duration, 'seconds');
          const separator = ',';
          const formattedDuration = formatDuration({ duration, separator });
          const durationString = `${durationTranslation}, ${formattedDuration}`;

          const useLargeImages = i === 0 && promoItems.length >= 3;
          const showDuration =
            promo.duration && ['video', 'audio'].includes(promo.type);
          const isMedia = ['video', 'audio', 'photogallery'].includes(
            promo.type,
          );
          const typeTranslated =
            (promo.type === 'audio' && `${audioTranslation}, `) ||
            (promo.type === 'video' && `${videoTranslation}, `) ||
            (promo.type === 'photogallery' && `${photoGalleryTranslation}, `);

          return (
            <li
              key={promo.id}
              css={({ mq }: Theme) => [
                styles.item,
                getStyles(promoItems.length, i, mq),
              ]}
            >
              <Promo>
                <Promo.Image
                  useLargeImages={useLargeImages}
                  src={promo.imageUrl || ''}
                  alt={promo.imageAlt}
                  loading="lazy"
                >
                  <Promo.MediaIcon type={promo.type}>
                    {showDuration ? promo.duration : ''}
                  </Promo.MediaIcon>
                </Promo.Image>
                <Promo.Heading
                  as={`h${headingLevel}`}
                  css={(theme: Theme) => ({
                    color: theme.palette.GREY_10,
                    ...(i === 0 && theme.fontSizes.paragon),
                  })}
                >
                  {isMedia ? (
                    <Promo.A
                      href={promo.link}
                      aria-labelledby={promo.id}
                      className="focusIndicatorDisplayBlock"
                    >
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
                    <Promo.A
                      href={promo.link}
                      className="focusIndicatorDisplayBlock"
                    >
                      {promo.title}
                    </Promo.A>
                  )}
                </Promo.Heading>
                <Promo.Body className="promo-paragraph" css={styles.body}>
                  {promo.description}
                </Promo.Body>
                <Promo.Timestamp className="promo-timestamp">
                  {promo.firstPublished}
                </Promo.Timestamp>
              </Promo>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HiearchicalGrid;
