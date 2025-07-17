/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import { use } from 'react';
import moment from 'moment';
import path from 'ramda/src/path';
import VisuallyHiddenText from '../../VisuallyHiddenText';
import formatDuration from '../../../lib/utilities/formatDuration';
import Promo from '../../../legacy/components/Promo';
import { DESKTOP, TABLET, MOBILE, SMALL } from './dataStructures';
import { ServiceContext } from '../../../contexts/ServiceContext';
import { CurationGridProps } from '../types';
import { RequestContext } from '../../../contexts/RequestContext';
import LiveLabel from '../../LiveLabel';

const getResponsiveClasses = (promoCount: number, i: number) => {
  const small = SMALL[promoCount - 1][i];
  const mobile = MOBILE[promoCount - 1][i];
  const tablet = TABLET[promoCount - 1][i];
  const desktop = DESKTOP[promoCount - 1][i];
  
  let classes = 'relative inline';
  
  // Apply responsive grid styling based on breakpoints
  if (small?.gridColumn) {
    classes += ` group-1:col-span-${small.gridColumn.replace('span ', '')}`;
  }
  if (small?.gridRow) {
    classes += ` group-1:row-span-${small.gridRow.replace('span ', '')}`;
  }
  if (mobile?.gridColumn) {
    classes += ` group-2:col-span-${mobile.gridColumn.replace('span ', '')}`;
  }
  if (mobile?.gridRow) {
    classes += ` group-2:row-span-${mobile.gridRow.replace('span ', '')}`;
  }
  if (tablet?.gridColumn) {
    classes += ` group-3:col-span-${tablet.gridColumn.replace('span ', '')}`;
  }
  if (tablet?.gridRow) {
    classes += ` group-3:row-span-${tablet.gridRow.replace('span ', '')}`;
  }
  if (desktop?.gridColumn) {
    classes += ` group-4:col-span-${desktop.gridColumn.replace('span ', '')}`;
  }
  if (desktop?.gridRow) {
    classes += ` group-4:row-span-${desktop.gridRow.replace('span ', '')}`;
  }
  
  return classes;
};

const HiearchicalGrid = ({
  summaries,
  headingLevel,
  isFirstCuration,
}: CurationGridProps) => {
  const { isAmp, isLite } = use(RequestContext);
  const { translations } = use(ServiceContext);

  const audioTranslation = path(['media', 'audio'], translations);
  const videoTranslation = path(['media', 'video'], translations);
  const photoGalleryTranslation = path(['media', 'photogallery'], translations);
  const durationTranslation = path(['media', 'duration'], translations);
  if (!summaries || summaries.length < 3) return null;

  const promoItems = summaries.slice(0, 12);
  return (
    <div data-testid="hierarchical-grid">
      <ul 
        role="list" 
        className={`p-0 m-0 mb-quintuple grid grid-cols-2 gap-double group-3:grid-cols-3 group-4:grid-cols-4 ${isLite ? 'group-3:grid-cols-1 group-4:grid-cols-1 [&_li]:col-auto [&_li]:row-auto [&_li]:pt-0 [&_li_.promo-image]:hidden [&_li_.promo-text]:w-full [&_li_.promo-text]:ps-0 [&_li:before]:hidden' : ''}`}
        data-testid="topic-promos"
      >
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
              className={getResponsiveClasses(promoItems.length, i)}
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
                  className={`text-grey-10 ${i === 0 ? 'text-paragon' : ''}`}
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
                <Promo.Body className="promo-paragraph mt-0 mb-double text-grey-10 text-longPrimer">
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
