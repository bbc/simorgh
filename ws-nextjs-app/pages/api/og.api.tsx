import React from 'react';
import { NextApiRequest } from 'next';
import { ImageResponse } from 'next/og';
import getBrandedImage from '#lib/utilities/getBrandedImage';
import filterForBlockType from '#app/lib/utilities/blockHandlers';

export const config = { runtime: 'edge' };

const responseNotFound = () => new Response('Not found', { status: 404 });

export default async function handler(req: NextApiRequest) {
  try {
    const { searchParams } = new URL(
      req.url ?? '',
      `https://${req.headers.host}`,
    );

    const id = searchParams.get('id');
    const service = searchParams.get('service');

    if (!id || !service) responseNotFound();

    const articleResponse = await fetch(
      `https://web-cdn.api.bbci.co.uk/fd/simorgh-bff?pageType=article&id=${id}&service=${service}`,
    );
    const articleResponseJson = await articleResponse.json();

    const articleData = articleResponseJson?.data?.article;

    if (!articleData) responseNotFound();

    const readTime = articleData?.metadata?.stats?.readTime;

    const promoImageBlocks =
      articleData?.promo?.images?.defaultPromoImage?.blocks ?? [];

    const promoImageRawBlock = filterForBlockType(promoImageBlocks, 'rawImage');

    const promoImage = promoImageRawBlock?.model?.locator;

    const image = promoImage
      ? getBrandedImage(promoImage, service)
      : `https://news.files.bbci.co.uk/ws/img/logos/og/${service}.png`;

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
          <div
            style={{
              position: 'absolute',
              top: '25px',
              right: '25px',
              backgroundColor: 'rgba(0,0,0,0.6)',
              padding: '10px 20px',
              borderRadius: '10px',
              fontWeight: 'bold',
              fontSize: '24px',
              color: 'white',
            }}
          >
            🔥 Trending story
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '25px',
              right: '25px',
              backgroundColor: 'rgba(0,0,0,0.6)',
              padding: '10px 20px',
              borderRadius: '10px',
              fontWeight: 'bold',
              fontSize: '24px',
              color: 'white',
            }}
          >
            {`Read time: ${readTime} minutes`}
          </div>
        </div>
      ),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new Response(error.message, {
      status: 500,
    });
  }
}
