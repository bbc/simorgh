import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

const IFRAME_BASE_URL = getEnvConfig().SIMORGH_INCLUDES_BASE_URL;
const AMP_IFRAME_BASE_URL = getEnvConfig().SIMORGH_INCLUDES_BASE_AMP_URL;

export default {
  iframeHeight: 324,
  iframeSrc: `${IFRAME_BASE_URL}/include/vjafwest/1365-2024-us-presidential-election-banner/develop/{service}/app`,
  iframeSrcAmp: `${AMP_IFRAME_BASE_URL}/include/vjafwest/1365-2024-us-presidential-election-banner/develop/{service}/app/amp`,
  thingIds: [
    '647d5613-e0e2-4ef5-b0ce-b491de38bdbd', // https://www.bbc.co.uk/things/647d5613-e0e2-4ef5-b0ce-b491de38bdbd
  ],
};
