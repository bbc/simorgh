import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

const IFRAME_BASE_URL = getEnvConfig().SIMORGH_INCLUDES_BASE_URL;

export default {
  iframeSrc: `${IFRAME_BASE_URL}/include/vjsthasia/2308-india-elections-2024-results-page/develop/english/election-banner/embed`,
  thingId: '647d5613-e0e2-4ef5-b0ce-b491de38bdbd',
};
