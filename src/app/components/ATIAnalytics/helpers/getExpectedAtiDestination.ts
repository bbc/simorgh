/* eslint-disable import/prefer-default-export */
/* eslint-disable no-template-curly-in-string */
import { Services } from '#app/models/types/global';

const publicServiceDestinationNames = {
  news: 'NEWS_PS',
  japanese: 'NEWS_LANGUAGES_GNL',
} as Record<Services, string>;

const expectedAtiDestinationsForAmp = {
  WS_NEWS_LANGUAGES: '598342',
  WS_NEWS_LANGUAGES_TEST: '598343',
  NEWS_LANGUAGES_GNL: 646753,
  NEWS_LANGUAGES_GNL_TEST: 598290,
};

export const getExpectedAtiDestination = ({
  service,
  applicationEnv,
}: {
  service: Services;
  applicationEnv: string;
}) => {
  const destinationName =
    publicServiceDestinationNames[service] ?? 'WS_NEWS_LANGUAGES';

  return expectedAtiDestinationsForAmp[
    applicationEnv === 'live' ? destinationName : `${destinationName}_TEST`
  ];
};
