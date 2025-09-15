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
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from '#app/lib/statusCodes.const';
import defaultServiceVariants from '#app/lib/config/services/defaultServiceVariants';
import sendCustomMetric from '#src/server/utilities/customMetrics';
import { NON_200_RESPONSE } from '#src/server/utilities/customMetrics/metrics.const';
import nodeLogger from '#lib/logger.node';
import { SERVER_SIDE_REQUEST_FAILED } from '#app/lib/logger.const';
import Badge from '../Badge';
import {
  extractArticleData,
  extractLiveData,
  responseNotFound,
  responseServerError,
} from '../utils';
import BackgroundImage from '../BackgroundImage';
import {
  ArabicMostReadSVG,
  ArabicTopStoriesSVG,
  RTLLiveSVG,
} from '../RTLBadges';

const logger = nodeLogger(__filename);
const pageTypeToLog = 'og-image';

const REITH_SANS_MEDIUM_FONT_URL = `${REITH_FONTS_DIR}BBCReithSans_W_Md.woff`;
const REITH_SANS_BOLD_FONT_URL = `${REITH_FONTS_DIR}BBCReithSans_W_Bd.woff`;

const getPageType = (id: string) => {
  if (getArticleId(id)) return 'article';
  if (getTipoId(id)) return 'live';

  return null;
};

const RTL_SERVICES: Services[] = [
  'arabic',
  'dari',
  'pashto',
  'persian',
  'urdu',
] as const;

export async function GET(
  req: Request,
  { params }: { params: { id: string; service: Services } },
) {
  try {
    const { searchParams } = new URL(
      req.url ?? '',
      `https://${req.headers.get('host')}`,
    );

    // https://nextjs.org/docs/messages/sync-dynamic-apis
    const { id, service } = await params;

    if (!id || !service) return responseNotFound();

    const rendererEnv =
      searchParams.get('renderer_env') || process.env.SIMORGH_APP_ENV;

    const pageType = getPageType(id);

    if (!pageType) return responseNotFound();

    const [{ data }, sansMediumBuffer, sansBoldBuffer] = await Promise.all([
      // Fetch asset
      getPageData({
        id,
        service,
        resolvedUrl: req.url,
        rendererEnv,
        pageType,
      }),
      // Fetch fonts
      fetch(REITH_SANS_MEDIUM_FONT_URL).then(res => res.arrayBuffer()),
      fetch(REITH_SANS_BOLD_FONT_URL).then(res => res.arrayBuffer()),
    ]);

    if (data.status === NOT_FOUND) return responseNotFound();
    if (data.status === INTERNAL_SERVER_ERROR) return responseServerError();

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
                <circle cx="16" cy="16" r="8.5" style={{ fill: LIVE_LIGHT }} />
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

    // Library does not support RTL text, so we use pre-baked SVGs for the MostRead and TopStories badges
    if (service === 'arabic') {
      switch (true) {
        case isLive:
          badge = <RTLLiveSVG />;
          break;
        case isInTopStories:
          badge = <ArabicTopStoriesSVG />;
          break;
        case isInMostRead:
          badge = <ArabicMostReadSVG />;
          break;
        default:
          badge = undefined;
      }
    } else if (RTL_SERVICES.includes(service)) {
      badge = null; // No badge for RTL services other than Arabic for initial experiment
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

    const buffer = Buffer.from(await imageResponse.arrayBuffer());

    return new Response(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': buffer.length.toString(),
        'Cache-Control':
          'public, stale-if-error=3600, stale-while-revalidate=3600, max-age=600',
      },
    });
  } catch (error: unknown) {
    const { message } = error as FetchError;

    sendCustomMetric({
      metricName: NON_200_RESPONSE,
      statusCode: 500,
      // @ts-expect-error - Not a real pageType yet
      pageType: pageTypeToLog,
      requestUrl: req.url,
    });

    logger.error(SERVER_SIDE_REQUEST_FAILED, {
      status: 500,
      message: { message, url: req.url },
      url: req.url,
      pageType: pageTypeToLog,
    });

    return new Response(message, { status: 500 });
  }
}
