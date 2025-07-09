import React from 'react';
import { NextApiRequest } from 'next';
import { ImageResponse } from 'next/og';
import getBrandedImage from '#lib/utilities/getBrandedImage';
import filterForBlockType from '#app/lib/utilities/blockHandlers';
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';

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
      fontWeight: 'bold',
      fontSize: '24px',
      color: 'white',
    }}
  >
    {children}
  </div>
);

const TrendingStoryIcon = () => (
  <BadgeWrapper>
    <span style={{ marginRight: 10 }}>⬆️</span>
    <span>Trending story</span>
  </BadgeWrapper>
);

const ReadTime = ({ readTime }: { readTime: number }) => (
  <BadgeWrapper>
    <span style={{ marginRight: 10 }}>⏰</span>
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
              bottom: '25px',
              right: '25px',
              backgroundColor: 'rgba(0,0,0,0.6)',
              padding: '10px 20px',
              borderRadius: '10px',
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
