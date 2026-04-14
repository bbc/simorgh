import chineseTaipeiOlympics from '@bbc/web-assets/static/sport/country-flags/chineseTaipeiOlympics.svg';
import individualNeutralAthletes from '@bbc/web-assets/static/sport/olympics/individual-neutral-athletes.svg';
import refugeeOlympicTeam from '@bbc/web-assets/static/sport/olympics/refugee-olympic-team.svg';
import monaco from '@bbc/web-assets/static/sport/country-flags/monaco.svg';
import { getBaseCountryFlagsMapping } from './country-flags.js';

const map = {
  ...getBaseCountryFlagsMapping('olympics'),

  'urn:bbc:sportsdata:olympics:country:chinese-taipei': chineseTaipeiOlympics,
  'urn:bbc:sportsdata:olympics:country:eor': refugeeOlympicTeam,
  'urn:bbc:sportsdata:olympics:country:individual-neutral-athletes': individualNeutralAthletes,
  'urn:bbc:sportsdata:olympics:country:refugee-olympic-team': refugeeOlympicTeam,
  'urn:bbc:sportsdata:olympics:country:taiwan': chineseTaipeiOlympics,
  'urn:bbc:sportsdata:olympics:country:monaco': monaco
};

export default map;
