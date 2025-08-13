/* eslint-disable import/prefer-default-export */
import React from 'react';
import filterForBlockType from '#app/lib/utilities/blockHandlers';
import {
  LIVE_CORE,
  POSTBOX,
  SPORT_YELLOW,
  WHITE,
} from '#app/components/ThemeProvider/palette';
import { REITH_FONTS_DIR } from '#app/components/ThemeProvider/fontFaces';
import { Services, Variants } from '#app/models/types/global';
import { FetchError } from '#app/models/types/fetch';
import getPageData from '#nextjs/utilities/pageRequests/getPageData';
import Badge from './Badge';
import { getImages, responseNotFound } from './utils';
import horizontalLayout from './HorizontalLayout';
import socialCardLayout from './SocialCardLayout';

const REITH_SANS_BOLD_FONT_URL = `${REITH_FONTS_DIR}/BBCReithSans_W_Bd.woff`;
const REITH_SERIF_BOLD_FONT_URL = `${REITH_FONTS_DIR}/BBCReithSerif_W_Bd.woff`;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(
      req.url ?? '',
      `https://${req.headers.get('host')}`,
    );

    const id = searchParams.get('id');
    const service = searchParams.get('service') as Services;
    const variant = searchParams.get('variant') as Variants;

    const IS_SOCIAL_CARD = searchParams.get('socialCard') === 'true';
    const HAS_READ_TIME = searchParams.get('readTime') === 'true';
    const IS_LIVE = searchParams.get('live') === 'true';

    if (!id || !service) return responseNotFound();

    const [{ data }, sansBoldBuffer, serifBoldBuffer] = await Promise.all([
      // Fetch article
      getPageData({
        id,
        service,
        variant,
        resolvedUrl: req.url,
        rendererEnv: 'live',
        pageType: 'article',
      }),
      // Fetch fonts
      fetch(REITH_SANS_BOLD_FONT_URL).then(res => res.arrayBuffer()),
      fetch(REITH_SERIF_BOLD_FONT_URL).then(res => res.arrayBuffer()),
    ]);

    const articleData = data?.pageData?.article;

    if (!articleData) return responseNotFound();

    const readTime = articleData?.metadata?.stats?.readTime;

    const headline = articleData?.promo?.headlines?.seoHeadline;

    const promoImageBlocks =
      articleData?.promo?.images?.defaultPromoImage?.blocks ?? [];

    const promoImageRawBlock = filterForBlockType(promoImageBlocks, 'rawImage');

    const promoImage = promoImageRawBlock?.model;

    const { unbrandedImage } = getImages({ promoImage, service });

    const isInTopStories = Boolean(
      data?.pageData?.secondaryData?.topStories.some(
        (topStoryItem: { id: string | string[] }) =>
          topStoryItem?.id.includes(id),
      ),
    );

    const isInMostRead = Boolean(
      data?.pageData?.secondaryData?.mostRead?.items.some(
        (mostReadItem: { id: string | string[] }) =>
          mostReadItem?.id.includes(id),
      ),
    );

    const fonts = [
      { name: 'Reith Sans Bold', data: sansBoldBuffer },
      { name: 'Reith Serif Bold', data: serifBoldBuffer },
    ];

    const serviceConfig = await import(
      `#app/lib/config/services/${service}`
    ).then(mod => mod.service);

    const { translations } = serviceConfig[variant || 'default'];

    const trendingText = translations?.trendingBadge || 'Trending';

    const popularText = translations?.popularBadge || 'Popular';

    const readTimeText = translations?.readTimeBadge || '{{time}} min read';

    const liveText = translations?.liveExperiencePage?.live || 'Live';

    const badges = [
      isInTopStories && (
        <Badge
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
              <path
                d="m6.3 20.9-1.5 1.5c-1.5-1.5-2.7-3.3-3.5-5.2q-1.2-2.85-1.2-6c0-3.15.4-4 1.2-6s2-3.6 3.5-5.2l1.5 1.5C5 2.8 4 4.4 3.3 6.1s-1 3.4-1 5.2.3 3.5 1 5.2 1.7 3.1 3 4.4m3-3-1.5 1.6c-1.1-1.1-2-2.4-2.5-3.9-.6-1.4-.8-2.9-.8-4.4s.3-2.9.8-4.4C5.8 5.4 6.7 4.1 7.8 3l1.5 1.5c-.9.9-1.6 2-2 3.1-.5 1.2-.7 2.4-.7 3.6s.2 2.4.7 3.6c.4 1.1 1.1 2.2 2 3.1m1.6-6.7c0 1.4.5 2.7 1.5 3.7l-1.5 1.5c-.7-.7-1.2-1.5-1.6-2.4s-.5-1.8-.5-2.7.2-1.8.5-2.7c.4-.9.9-1.7 1.6-2.4l1.5 1.5c-1 .9-1.5 2.1-1.5 3.5m8.1 0q0 1.05-.6 1.8c-.4.5-.9.9-1.5 1.1L21 32H11l4-17.9c-.6-.2-1.1-.6-1.5-1.1q-.6-.75-.6-1.8c0-.9.3-1.6.9-2.2s1.3-.9 2.2-.9 1.6.3 2.2.9c.5.6.8 1.3.8 2.2m2.1 5.1-1.5-1.5c1-1 1.5-2.3 1.5-3.7q0-2.1-1.5-3.6L21.1 6c.7.7 1.3 1.5 1.6 2.4.4.9.5 1.8.5 2.7s-.2 1.8-.5 2.7c-.3 1-.8 1.8-1.6 2.5m3.1 3.1-1.5-1.6c.9-.9 1.6-1.9 2-3.1.5-1.2.7-2.4.7-3.6s-.2-2.4-.7-3.6-1.1-2.2-2-3.1L24.2 3c1.1 1.1 2 2.4 2.5 3.8.6 1.4.8 2.9.8 4.4s-.3 2.9-.8 4.4c-.5 1.4-1.4 2.7-2.5 3.8m3 3-1.5-1.5c1.3-1.3 2.4-2.8 3-4.5s1-3.4 1-5.2c0-1.7-.3-3.5-1-5.2s-1.7-3.2-3-4.6L27.2 0c1.5 1.5 2.7 3.3 3.5 5.2q1.2 2.85 1.2 6c0 3.15-.4 4-1.2 6-.8 1.9-2 3.7-3.5 5.2"
                style={{ fill: WHITE }}
              />
            </svg>
          }
          text={trendingText}
          backgroundColor={POSTBOX}
        />
      ),
      IS_LIVE && (
        <Badge
          icon={
            <svg viewBox="0 0 32 32" width="24" height="24">
              <path
                d="M16 4c6.6 0 12 5.4 12 12s-5.4 12-12 12S4 22.6 4 16 9.4 4 16 4zm0-4C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0z"
                style={{ fill: WHITE }}
              />
              <circle cx="16" cy="16" r="8.5" style={{ fill: WHITE }} />
            </svg>
          }
          text={liveText}
          backgroundColor={LIVE_CORE}
          uppercase
        />
      ),
      isInMostRead && (
        <Badge
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              width="40"
              height="40"
            >
              <path
                style={{ fill: WHITE }}
                d="M17.9 7v2.6h8.7l-.3-.7-9.1 9.1h1.3l-5.8-5.9-11.1 11L3.7 25l9.8-9.7h-1.4l5.8 5.8 10.3-10.3-.7-.3v8.7h2.6V7z"
              />
            </svg>
          }
          text={popularText}
        />
      ),
      HAS_READ_TIME && (
        <Badge
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              width="26"
              height="26"
            >
              <path
                style={{ fill: SPORT_YELLOW }}
                d="m20.5 23.1.9-1.2-4.5-3.6-.6-6.7h-1.5l-.6 8.3zm-5-17.5c-1 0-1.5-.7-1.5-1.5s.6-1.5 1.7-1.5 1.7.7 1.7 1.5-.6 1.5-1.5 1.5zm-2.1 1h4.4c1.1-.7 1.5-1.6 1.5-2.7 0-1.6-1.3-3.4-3.7-3.4s-3.7 1.8-3.7 3.4q0 1.65 1.5 2.7m12.5 6.2 3.3-3.3L25.7 6l-3.3 3.3zM2.7 18.6c0 7.3 5.4 12.9 12.9 12.9 7.6 0 12.9-5.4 12.9-12.9s-5.3-13-12.9-13c-7.5 0-12.9 5.6-12.9 13m23.1 0c0 6-4.2 10.3-10.2 10.3S5.4 24.6 5.4 18.6 9.7 8.3 15.6 8.3s10.2 4.2 10.2 10.3"
              />
            </svg>
          }
          text={readTimeText.replace('{{time}}', readTime.toString())}
        />
      ),
    ]
      .filter(Boolean)
      .slice(0, 1); // Limit to one badge for now

    switch (true) {
      case IS_SOCIAL_CARD:
        return socialCardLayout({
          image: unbrandedImage,
          headline,
          badges,
          fonts,
        });

      default:
        return horizontalLayout({
          image: unbrandedImage,
          badges,
          fonts,
        });
    }
  } catch (error: unknown) {
    const { message } = error as FetchError;

    return new Response(message, { status: 500 });
  }
}
