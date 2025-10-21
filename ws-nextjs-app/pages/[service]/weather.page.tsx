/** @jsx jsx */
// @ts-nocheck

import { GetServerSideProps } from 'next';
import { useEffect, use } from 'react';
import { jsx } from '@emotion/react';
import { ParsedUrlQuery } from 'querystring';
import omit from 'ramda/src/omit';
import { ServiceContext } from '#contexts/ServiceContext';
import { STATIC_PAGE } from '#app/routes/utils/pageTypes';
import {
  Articles,
  Book,
  Calculator,
  Calendar,
  Clock,
  Favourites,
  Words,
} from '#app/components/icons';
import Weather from '#app/components/Weather';
import nodeLogger from '#lib/logger.node';
import logResponseTime from '#server/utilities/logResponseTime';
import isLocal from '#lib/utilities/isLocal';

import {
  ROUTING_INFORMATION,
  SERVER_SIDE_RENDER_REQUEST_RECEIVED,
} from '#app/lib/logger.const';
import { Services, Variants } from '#models/types/global';
import extractHeaders from '../../../src/server/utilities/extractHeaders';
import styles from './wrappedStyles';

interface PageDataParams extends ParsedUrlQuery {
  id: string;
  page?: string;
  service: Services;
  variant?: Variants;
  // eslint-disable-next-line camelcase
  renderer_env?: string;
}

const logger = nodeLogger(__filename);

export const getServerSideProps: GetServerSideProps = async context => {
  logResponseTime(
    {
      path: context.resolvedUrl,
    },
    context.res,
    () => null,
  );

  const {
    service,
    // renderer_env: rendererEnv,
  } = context.query as PageDataParams;

  const { headers: reqHeaders } = context.req;

  logger.debug(SERVER_SIDE_RENDER_REQUEST_RECEIVED, {
    url: context.resolvedUrl,
    headers: omit(
      (process.env.SENSITIVE_HTTP_HEADERS || '').split(','),
      reqHeaders,
    ),
    pageType: 'staticPage',
  });

  const routingInfoLogger = logger.debug;

  routingInfoLogger(ROUTING_INFORMATION, {
    url: context.resolvedUrl,
    status: 200,
    pageType: 'staticPage',
  });
  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=300, stale-while-revalidate=120, max-age=30',
  );

  context.res.statusCode = 200;
  return {
    props: {
      error: null,
      isAmp: false,
      isNextJs: true,
      page: null,
      pageData: {
        metadata: {
          type: STATIC_PAGE,
        },
      },
      pageType: STATIC_PAGE,
      pathname: context.resolvedUrl,
      service,
      status: 200,
      timeOnServer: Date.now(), // TODO: check if needed?
      ...extractHeaders(reqHeaders),
    },
  };
};

const pageLayout = () => {
  const { datetimeLocale, locale, service } = use(ServiceContext);
  const defaultWeatherLocation = () => {
    switch (service) {
      case 'afaanoromoo':
      case 'amharic':
        return 344979; // Addis Ababa
        break;
      case 'afrique':
        return 2314302; // Kinshasa
        break;
      case 'arabic':
        return 360630; // Cairo
        break;
      case 'azeri':
        return 587084; // Baku
        break;
      case 'hindi':
        return 1261481; // Delhi
        break;
      case 'gujarati':
        return 1279233; // Ahmedabad
        break;
      case 'marathi':
        return 1259229; // Pune
        break;
      case 'mundo':
        return 3530597; // Mexico City
        break;
      case 'portuguese':
        return 3469058; // Brasilia
        break;
      case 'sinhala':
        return 1248991; // Colombo
        break;
      case 'tamil':
        return 1264527; // Chennai
        break;
      case 'telugu':
        return 1269843; // Hyderabad
        break;
      case 'urdu':
        return 1176615; // Hyderabad
        break;
      default:
        return 3469058; // Brasilia
        break;
    }
  };

  return (
    <main>
      <div css={styles.outerGrid}>
        <div css={styles.wideSection}>
          <h1 css={styles.h1}>Weather</h1>
          <Weather
            locationId={defaultWeatherLocation()}
            datetimeLocale={datetimeLocale}
            locale={locale}
          />
        </div>
      </div>
    </main>
  );
};

export default pageLayout;
