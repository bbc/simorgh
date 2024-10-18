import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

const IFRAME_BASE_URL = getEnvConfig().SIMORGH_INCLUDES_BASE_URL;

export default {
  iframeSrc: `${IFRAME_BASE_URL}/include/vjafwest/1365-2024-us-presidential-election-banner/develop/{service}/app`,
  iframeHeight: 340,
  thingIds: [
    '647d5613-e0e2-4ef5-b0ce-b491de38bdbd', // https://www.bbc.co.uk/things/647d5613-e0e2-4ef5-b0ce-b491de38bdbd
    '82857f8e-8134-462a-bb32-b7b14f4eab75', // https://www.bbc.co.uk/things/82857f8e-8134-462a-bb32-b7b14f4eab75
  ],
};
