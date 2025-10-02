/* eslint-disable import/prefer-default-export */
import React from 'react';
import { LIVE_LIGHT } from '#app/components/ThemeProvider/palette';
import { REITH_FONTS_DIR } from '#app/components/ThemeProvider/fontFaces';
import { Services } from '#app/models/types/global';
import { FetchError } from '#app/models/types/fetch';
import getPageData from '#nextjs/utilities/pageRequests/getPageData';
import { ImageResponse } from 'next/og';
import {
  getArticleId,
  getTipoId,
} from '#app/routes/utils/constructPageFetchUrl';
import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
} from '#app/lib/statusCodes.const';
import defaultServiceVariants from '#app/lib/config/services/defaultServiceVariants';
import sendCustomMetric from '#src/server/utilities/customMetrics';
import { NON_200_RESPONSE } from '#src/server/utilities/customMetrics/metrics.const';
import nodeLogger from '#lib/logger.node';
import {
  ROUTING_INFORMATION,
  SERVER_SIDE_REQUEST_FAILED,
} from '#app/lib/logger.const';
import sharp from 'sharp';
import Badge from '../Badge';
import {
  extractArticleData,
  extractLiveData,
  pageTypeToLog,
  responseNotFound,
  responseServerError,
} from '../utils';
import BackgroundImage from '../BackgroundImage';
import {
  ArabicLiveSVG,
  ArabicMostReadSVG,
  ArabicTopStoriesSVG,
  HindiLiveSVG,
  HindiMostReadSVG,
  HindiTopStoriesSVG,
} from '../NonLatinBadges';

const logger = nodeLogger(__filename);

const REITH_SANS_MEDIUM_FONT_URL = `${REITH_FONTS_DIR}BBCReithSans_W_Md.woff`;
const REITH_SANS_BOLD_FONT_URL = `${REITH_FONTS_DIR}BBCReithSans_W_Bd.woff`;

const getPageType = (id: string) => {
  if (getArticleId(id)) return 'article';
  if (getTipoId(id)) return 'live';

  return null;
};

const NON_LATIN_SERVICES: Services[] = ['arabic', 'hindi'] as const;

type SVGBadgesMap = {
  [S in (typeof NON_LATIN_SERVICES)[number]]: Record<
    'Live' | 'MostRead' | 'TopStories',
    () => React.ReactNode
  >;
};

const SVG_BADGES = {
  arabic: {
    Live: ArabicLiveSVG,
    MostRead: ArabicMostReadSVG,
    TopStories: ArabicTopStoriesSVG,
  },
  hindi: {
    Live: HindiLiveSVG,
    MostRead: HindiMostReadSVG,
    TopStories: HindiTopStoriesSVG,
  },
} as SVGBadgesMap;

const compressArrayBuffer = async (
  arrayBuffer: ArrayBuffer,
): Promise<ArrayBuffer> => {
  const buffer = Buffer.from(arrayBuffer);
  const compressedBuffer = await sharp(buffer).jpeg({ quality: 65 }).toBuffer();
  return new Uint8Array(compressedBuffer).buffer;
};

export async function GET(
  req: Request,
  { params }: { params: { id: string; service: Services } },
) {
  const { searchParams, pathname } = new URL(
    req.url ?? '',
    `https://${req.headers.get('host')}`,
  );

  try {
    // https://nextjs.org/docs/messages/sync-dynamic-apis
    const { id, service } = await params;

    if (!id || !service) return responseNotFound({ pathname });

    const rendererEnv =
      searchParams.get('renderer_env') || process.env.SIMORGH_APP_ENV;

    const pageType = getPageType(id);

    if (!pageType) return responseNotFound({ pathname });

    const [{ data }, sansMediumBuffer, sansBoldBuffer] = await Promise.all([
      // Fetch asset
      getPageData({
        id,
        service,
        resolvedUrl: pathname,
        rendererEnv,
        pageType,
      }),
      // Fetch fonts
      fetch(REITH_SANS_MEDIUM_FONT_URL).then(res => res.arrayBuffer()),
      fetch(REITH_SANS_BOLD_FONT_URL).then(res => res.arrayBuffer()),
    ]);

    if (data.status === NOT_FOUND) return responseNotFound({ pathname });
    if (data.status === INTERNAL_SERVER_ERROR)
      return responseServerError({ pathname });

    const dataExtractor = {
      live: extractLiveData,
      article: extractArticleData,
    }[pageType];

    const { backgroundImage, isInMostRead, isInTopStories, isLive } =
      dataExtractor({
        pageData: data.pageData,
        service,
      });

    const fonts = [
      { name: 'Reith Sans Medium', data: sansMediumBuffer },
      { name: 'Reith Sans Bold', data: sansBoldBuffer },
    ];

    const serviceConfig = await import(
      `#app/lib/config/services/${service}`
    ).then(mod => mod.service);

    const defaultVariant = defaultServiceVariants[service] || 'default';

    const { translations, mostRead } = serviceConfig[defaultVariant];

    const liveText = translations?.liveExperiencePage?.liveLabel || 'Live';
    const mostReadText = mostRead?.header || 'Most read';
    const topStoriesText = translations?.topStoriesTitle || 'Top stories';

    let badge: React.ReactNode;

    /* 
      Badge priority order:
        1. Live
        2. Top Stories
        3. Most read
    */
    // If service is non-latin (currently Arabic and Hindi), use SVG badges as its more difficult to load fonts for these
    // RTL scripts are also not supported by the ImageResponse function
    if (NON_LATIN_SERVICES.includes(service)) {
      const BadgeSVGs = SVG_BADGES[service];

      switch (true) {
        case isLive:
          badge = <BadgeSVGs.Live />;
          break;
        case isInTopStories:
          badge = <BadgeSVGs.TopStories />;
          break;
        case isInMostRead:
          badge = <BadgeSVGs.MostRead />;
          break;
        default:
          badge = null;
      }
    } else {
      switch (true) {
        case isLive:
          badge = (
            <Badge
              icon={
                <svg viewBox="0 0 32 32" width="24" height="24">
                  <path
                    d="M16 4c6.6 0 12 5.4 12 12s-5.4 12-12 12S4 22.6 4 16 9.4 4 16 4zm0-4C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0z"
                    style={{ fill: LIVE_LIGHT }}
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="8.5"
                    style={{ fill: LIVE_LIGHT }}
                  />
                </svg>
              }
              text={liveText}
              textColour={LIVE_LIGHT}
              uppercase
              bold
            />
          );
          break;
        case isInTopStories:
          badge = <Badge text={topStoriesText} />;
          break;
        case isInMostRead:
          badge = <Badge text={mostReadText} />;
          break;
        default:
          badge = undefined;
      }
    }

    const imageResponse = new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          <BackgroundImage image={backgroundImage} />
          {badge && (
            <div
              style={{
                position: 'absolute',
                bottom: 35,
                right: 25,
                display: 'flex',
                flexDirection: 'column',
                gap: 15,
              }}
            >
              {badge}
            </div>
          )}
        </div>
      ),
      {
        width: 1024,
        height: 576,
        fonts,
      },
    );

    const buffer = await imageResponse.arrayBuffer();

    const compressedImage = await compressArrayBuffer(buffer);

    logger.debug(ROUTING_INFORMATION, {
      url: pathname,
      status: OK,
      pageType: pageTypeToLog,
    });

    return new Response(compressedImage, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Length': compressedImage.byteLength.toString(),
        'Cache-Control':
          'public, stale-if-error=3600, stale-while-revalidate=3600, max-age=600',
      },
    });
  } catch (error: unknown) {
    const { message } = error as FetchError;

    sendCustomMetric({
      metricName: NON_200_RESPONSE,
      statusCode: INTERNAL_SERVER_ERROR,
      // @ts-expect-error - Not a real pageType yet
      pageType: pageTypeToLog,
      requestUrl: pathname,
    });

    logger.error(SERVER_SIDE_REQUEST_FAILED, {
      status: INTERNAL_SERVER_ERROR,
      message: { message, url: pathname },
      url: pathname,
      pageType: pageTypeToLog,
    });

    return new Response(message, { status: INTERNAL_SERVER_ERROR });
  }
}
