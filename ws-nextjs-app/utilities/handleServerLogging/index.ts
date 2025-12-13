import {
  SERVER_SIDE_RENDER_REQUEST_RECEIVED,
  SERVER_SIDE_REQUEST_FAILED,
} from '#app/lib/logger.const';
import { INTERNAL_SERVER_ERROR, OK } from '#app/lib/statusCodes.const';
import nodeLogger from '#lib/logger.node';
import { DocumentContext } from 'next/document';

import { PageTypes } from '#app/models/types/global';
import sendCustomMetric from '#src/server/utilities/customMetrics';
import { NON_200_RESPONSE } from '#src/server/utilities/customMetrics/metrics.const';
import removeSensitiveHeaders from '../removeSensitiveHeaders';

const logger = nodeLogger(__filename);

const handleServerLogging = ({
  ctx,
  pageType,
}: {
  ctx: DocumentContext;
  pageType: PageTypes;
}) => {
  const url = ctx.asPath || '';
  const headers = removeSensitiveHeaders(ctx.req?.headers);
  const { statusCode } = ctx.res || {};
  const { cause, message, name, stack } = ctx.err || {};

  switch (statusCode) {
    case OK:
      logger.debug(SERVER_SIDE_RENDER_REQUEST_RECEIVED, {
        url,
        headers,
        pageType,
      });
      break;
    case INTERNAL_SERVER_ERROR:
      sendCustomMetric({
        metricName: NON_200_RESPONSE,
        statusCode,
        pageType,
        requestUrl: url,
      });
      logger.error(SERVER_SIDE_REQUEST_FAILED, {
        status: INTERNAL_SERVER_ERROR,
        message: { cause, message, name, stack, url },
        url,
        headers,
        pageType,
      });
      break;
    default:
      break;
  }
};

export default handleServerLogging;
