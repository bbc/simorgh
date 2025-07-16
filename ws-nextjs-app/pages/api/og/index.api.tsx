import React from 'react';
import { NextApiRequest } from 'next';
import filterForBlockType from '#app/lib/utilities/blockHandlers';
import { LIVE_CORE, SPORT_YELLOW } from '#app/components/ThemeProvider/palette';
import { REITH_FONTS_DIR } from '#app/components/ThemeProvider/fontFaces';
import { Services, Variants } from '#app/models/types/global';
import Badge from './Badge';
import { getImages, responseNotFound } from './utils';
import horizontalLayout from './HorizontalLayout';
import socialCardLayout from './SocialCardLayout';

export const config = { runtime: 'edge' };

const REITH_SANS_BOLD_FONT_URL = `${REITH_FONTS_DIR}/BBCReithSans_W_Bd.woff`;
const REITH_SERIF_BOLD_FONT_URL = `${REITH_FONTS_DIR}/BBCReithSerif_W_Bd.woff`;

export default async function handler(req: NextApiRequest) {
  try {
    const { searchParams } = new URL(
      req.url ?? '',
      `https://${req.headers.host}`,
    );

    const id = searchParams.get('id');
    const service = searchParams.get('service') as Services;
    const variant = searchParams.get('variant') as Variants;
    const IS_SOCIAL_CARD = searchParams.get('socialCard') === 'true';

    if (!id || !service) return responseNotFound();

    const [articleResponse, sansBoldBuffer, serifBoldBuffer] =
      await Promise.all([
        // Fetch article
        fetch(
          `https://web-cdn.api.bbci.co.uk/fd/simorgh-bff?pageType=article&id=${id}&service=${service}${variant ? `&variant=${variant}` : ''}`,
        ),
        // Fetch fonts
        fetch(REITH_SANS_BOLD_FONT_URL).then(res => res.arrayBuffer()),
        fetch(REITH_SERIF_BOLD_FONT_URL).then(res => res.arrayBuffer()),
      ]);

    const articleResponseJson = await articleResponse.json();

    const articleData = articleResponseJson?.data?.article;

    if (!articleData) return responseNotFound();

    const readTime = articleData?.metadata?.stats?.readTime;

    const headline = articleData?.promo?.headlines?.seoHeadline;

    const promoImageBlocks =
      articleData?.promo?.images?.defaultPromoImage?.blocks ?? [];

    const promoImageRawBlock = filterForBlockType(promoImageBlocks, 'rawImage');

    const promoImage = promoImageRawBlock?.model;

    const { unbrandedImage, brandedImage } = getImages({ promoImage, service });

    // const isInTopStories = Boolean(
    //   articleResponseJson?.data?.secondaryData?.topStories.some(
    //     (topStory: { locators: { canonicalUrl: string | string[] } }) =>
    //       topStory?.locators?.canonicalUrl.includes(id),
    //   ),
    // );

    const isInMostRead = Boolean(
      articleResponseJson?.data?.secondaryData?.mostRead?.items.some(
        (mostReadItem: { id: string | string[] }) =>
          mostReadItem?.id.includes(id),
      ),
    );

    const fonts = [
      { name: 'Reith Sans Bold', data: sansBoldBuffer },
      { name: 'Reith Serif Bold', data: serifBoldBuffer },
    ];

    // const svgLogo = await import(
    //   `#app/components/ThemeProvider/chameleonLogos/${service}`
    // ).then(module => module.default);

    const serviceConfig = await import(
      `#app/lib/config/services/${service}`
    ).then(mod => mod.service);

    const { translations } = serviceConfig[variant || 'default'];

    const popularText = translations?.popularBadge || 'Popular';

    const readTimeText = translations?.readTimeBadge || '{{time}} min read';

    const badges = [
      isInMostRead && (
        <Badge
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              width="26"
              height="26"
            >
              <path
                style={{ fill: LIVE_CORE }}
                d="M17.9 7v2.6h8.7l-.3-.7-9.1 9.1h1.3l-5.8-5.9-11.1 11L3.7 25l9.8-9.7h-1.4l5.8 5.8 10.3-10.3-.7-.3v8.7h2.6V7z"
              />
            </svg>
          }
          text={popularText}
        />
      ),
      readTime && (
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
    ].filter(Boolean);

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
          image: brandedImage,
          badges,
          fonts,
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
