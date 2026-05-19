// biome-ignore-all lint/suspicious/noTemplateCurlyInString: this is fine
import type { Services } from '#app/models/types/global';

const publicServiceDestinationNames = {
  news: 'NEWS_PS',
  cymrufyw: 'NEWS_LANGUAGES_PS',
  naidheachdan: 'NEWS_LANGUAGES_PS',
  scotland: 'HOMEPAGE_PS',
  newsround: 'NEWSROUND',
  sport: 'SPORT_PS',
  japanese: 'NEWS_LANGUAGES_GNL',
} as Record<Services, string>;

const expectedAtiDestinationsForAmp = {
  WS_NEWS_LANGUAGES: '598342',
  WS_NEWS_LANGUAGES_TEST: '598343',
  NEWS_PS:
    '$IF($EQUALS($MATCH(${ampGeo}, gbOrUnknown, 0), gbOrUnknown), 598285, 644937)',
  NEWS_PS_TEST:
    '$IF($EQUALS($MATCH(${ampGeo}, gbOrUnknown, 0), gbOrUnknown), 598286, 598288)',
  NEWS_LANGUAGES_PS:
    '$IF($EQUALS($MATCH(${ampGeo}, gbOrUnknown, 0), gbOrUnknown), 598291, 646753)',
  NEWS_LANGUAGES_PS_TEST:
    '$IF($EQUALS($MATCH(${ampGeo}, gbOrUnknown, 0), gbOrUnknown), 598292, 598290)',
  HOMEPAGE_PS: '598273',
  HOMEPAGE_PS_TEST: '598274',
  NEWSROUND: '598293',
  NEWSROUND_TEST: '598294',
  SPORT_PS:
    '$IF($EQUALS($MATCH(${ampGeo}, gbOrUnknown, 0), gbOrUnknown), 598310, 644938)',
  SPORT_PS_TEST:
    '$IF($EQUALS($MATCH(${ampGeo}, gbOrUnknown, 0), gbOrUnknown), 598311, 598309)',
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
