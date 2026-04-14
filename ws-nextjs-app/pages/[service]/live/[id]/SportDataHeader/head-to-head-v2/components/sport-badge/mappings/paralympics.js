import individualNeutralAthletes from '@bbc/web-assets/static/sport/olympics/individual-neutral-athletes.svg';
import refugeeOlympicTeam from '@bbc/web-assets/static/sport/olympics/refugee-olympic-team.svg';
import refugeeParalympicTeam from '@bbc/web-assets/static/sport/paralympics/refugee-paralympics-team.svg';
import russia from '@bbc/web-assets/static/sport/country-flags/russia.svg';
import belarus from '@bbc/web-assets/static/sport/country-flags/belarus.svg';
import { getBaseCountryFlagsMapping } from './country-flags.js';

const map = {
  ...getBaseCountryFlagsMapping('paralympics'),
  // Sport slugs are olympics because we took the approach of retaining the
  // sport sport slug and varying the tournament slug with paralympics
  // A consequence is that these badges will also override the olympics badges
  'urn:bbc:sportsdata:olympics:country:individual-neutral-athletes': individualNeutralAthletes,
  'urn:bbc:sportsdata:olympics:country:refugee-olympic-team': refugeeOlympicTeam,
  'urn:bbc:sportsdata:olympics:country:rpt': refugeeParalympicTeam,
  'urn:bbc:sportsdata:olympics:country:npa': refugeeParalympicTeam,
  'urn:bbc:sportsdata:olympics:country:russian-federation': russia,
  'urn:bbc:sportsdata:olympics:country:belarus': belarus
};

export default map;
