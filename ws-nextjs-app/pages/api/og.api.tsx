import React from 'react';
import { NextApiRequest } from 'next';
import { ImageResponse } from 'next/og';
import getBrandedImage from '#lib/utilities/getBrandedImage';
import filterForBlockType from '#app/lib/utilities/blockHandlers';
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import { WHITE } from '#app/components/ThemeProvider/palette';

export const config = { runtime: 'edge' };

const responseNotFound = () => new Response('Not found', { status: 404 });

const BackgroundImage = ({ image }: { image: string }) => (
  <img
    src={image}
    alt="background"
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    }}
  />
);

const BadgeWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      fontWeight: 'bold',
      fontSize: 24,
      color: WHITE,
    }}
  >
    {children}
  </div>
);

const TrendingStoryIcon = () => (
  <BadgeWrapper>
    <span style={{ marginRight: 10 }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="26"
        height="26"
      >
        <path
          style={{ fill: WHITE }}
          d="M17.9 7v2.6h8.7l-.3-.7-9.1 9.1h1.3l-5.8-5.9-11.1 11L3.7 25l9.8-9.7h-1.4l5.8 5.8 10.3-10.3-.7-.3v8.7h2.6V7z"
        />
      </svg>
    </span>
    <span>Trending story</span>
  </BadgeWrapper>
);

const ReadTime = ({ readTime }: { readTime: number }) => (
  <BadgeWrapper>
    <span style={{ marginRight: 10 }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="26"
        height="26"
      >
        <path
          style={{ fill: WHITE }}
          d="m20.5 23.1.9-1.2-4.5-3.6-.6-6.7h-1.5l-.6 8.3zm-5-17.5c-1 0-1.5-.7-1.5-1.5s.6-1.5 1.7-1.5 1.7.7 1.7 1.5-.6 1.5-1.5 1.5zm-2.1 1h4.4c1.1-.7 1.5-1.6 1.5-2.7 0-1.6-1.3-3.4-3.7-3.4s-3.7 1.8-3.7 3.4q0 1.65 1.5 2.7m12.5 6.2 3.3-3.3L25.7 6l-3.3 3.3zM2.7 18.6c0 7.3 5.4 12.9 12.9 12.9 7.6 0 12.9-5.4 12.9-12.9s-5.3-13-12.9-13c-7.5 0-12.9 5.6-12.9 13m23.1 0c0 6-4.2 10.3-10.2 10.3S5.4 24.6 5.4 18.6 9.7 8.3 15.6 8.3s10.2 4.2 10.2 10.3"
        />
      </svg>
    </span>
    <span>{`${readTime} min read`}</span>
  </BadgeWrapper>
);

export default async function handler(req: NextApiRequest) {
  try {
    const { searchParams } = new URL(
      req.url ?? '',
      `https://${req.headers.host}`,
    );

    const id = searchParams.get('id');
    const service = searchParams.get('service');

    if (!id || !service) return responseNotFound();

    // TODO: Don't do this in production, this is just for testing
    const articleResponse = await fetch(
      `https://web-cdn.api.bbci.co.uk/fd/simorgh-bff?pageType=article&id=${id}&service=${service}`,
    );

    const articleResponseJson = await articleResponse.json();

    const articleData = articleResponseJson?.data?.article;

    if (!articleData) return responseNotFound();

    const readTime = articleData?.metadata?.stats?.readTime;

    const promoImageBlocks =
      articleData?.promo?.images?.defaultPromoImage?.blocks ?? [];

    const promoImageRawBlock = filterForBlockType(promoImageBlocks, 'rawImage');

    const promoImage = promoImageRawBlock?.model?.locator;

    const image = promoImage
      ? getBrandedImage(promoImage, service)
      : `https://news.files.bbci.co.uk/ws/img/logos/og/${service}.png`;

    const isInTopStories = Boolean(
      articleResponseJson?.data?.secondaryData?.topStories.some(
        (topStory: TopStoryItem) =>
          topStory?.locators?.canonicalUrl.includes(id),
      ),
    );

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          {image && <BackgroundImage image={image} />}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              bottom: 25,
              right: 25,
              backgroundColor: 'rgba(0,0,0,0.8)',
              padding: '10px 20px',
              borderRadius: 5,
            }}
          >
            {[
              isInTopStories && <TrendingStoryIcon />,
              readTime && <ReadTime readTime={readTime} />,
            ]
              .filter(Boolean)
              .map((child, index, arr) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  style={{
                    display: 'flex',
                    marginBottom: index < arr.length - 1 ? '10px' : '0px',
                  }}
                >
                  {child}
                </div>
              ))}
          </div>
        </div>
      ),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
